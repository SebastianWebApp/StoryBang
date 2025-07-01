package handler

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"soapencryptor/internal/config"
	"soapencryptor/internal/encrypt"
)

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

func SoapHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	xml := string(body)

	encryptor := encrypt.NewEncryptor([]byte(config.AESKey), []byte(config.AESIv))

	phone := encryptor.Encrypt(extractValue(xml, "phone"))
	password := encryptor.Encrypt(extractValue(xml, "password"))

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
