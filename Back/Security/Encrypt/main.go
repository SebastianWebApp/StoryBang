package main

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

// Command interface
type Command interface {
	Execute() string
}

// EncryptCommand concrete command
type EncryptCommand struct {
	text string
	key  []byte
	iv   []byte
}

func NewEncryptCommand(text string, key, iv []byte) *EncryptCommand {
	return &EncryptCommand{
		text: text,
		key:  key,
		iv:   iv,
	}
}

func (c *EncryptCommand) Execute() string {
	block, _ := aes.NewCipher(c.key)
	plaintext := []byte(c.text)
	cfb := cipher.NewCFBEncrypter(block, c.iv)
	ciphertext := make([]byte, len(plaintext))
	cfb.XORKeyStream(ciphertext, plaintext)
	return base64.StdEncoding.EncodeToString(ciphertext)
}

// Invoker
type Encryptor struct {
	key []byte
	iv  []byte
}

func NewEncryptor() *Encryptor {
	return &Encryptor{
		key: []byte("12345678901234567890123456789012"), // 32 bytes
		iv:  []byte("1234567890123456"),                 // 16 bytes
	}
}

func (e *Encryptor) Encrypt(text string) string {
	command := NewEncryptCommand(text, e.key, e.iv)
	return command.Execute()
}

// XML helper
func extractValue(xml, tag string) string {
	start := fmt.Sprintf("<%s>", tag)
	end := fmt.Sprintf("</%s>", tag)

	s := strings.Index(xml, start)
	e := strings.Index(xml, end)

	if s == -1 || e == -1 {
		return ""
	}
	s += len(start)
	return xml[s:e]
}

// SOAP Handler
func soapHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	xml := string(body)

	encryptor := NewEncryptor()

	// Extract and encrypt values
	phone := encryptor.Encrypt(extractValue(xml, "phone"))
	password := encryptor.Encrypt(extractValue(xml, "password"))

	// Create SOAP response
	response := fmt.Sprintf(`<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <EncryptResponse xmlns="http://encrypt.com/">
      <EncryptedPhone>%s</EncryptedPhone>
      <EncryptedPassword>%s</EncryptedPassword>
    </EncryptResponse>
  </soap:Body>
</soap:Envelope>`, phone, password)

	w.Header().Set("Content-Type", "text/xml")
	fmt.Fprint(w, response)
}

// Middleware CORS
func withCORS(next http.HandlerFunc, allowedOrigins []string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		for _, o := range allowedOrigins {
			if origin == o {
				w.Header().Set("Access-Control-Allow-Origin", origin)
				w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
				w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
				break
			}
		}

		// Handle preflight
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	}
}

func main() {
	// Cargar .env
	err := godotenv.Load()
	if err != nil {
		fmt.Println("⚠️  No se pudo cargar el archivo .env")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "4005"
	}

	origins := strings.Split(os.Getenv("CORS_ORIGIN"), ",")

	http.HandleFunc("/", withCORS(soapHandler, origins))

	fmt.Println("🟢 SOAP Server listening on http://localhost:" + port)
	http.ListenAndServe(":"+port, nil)
}
