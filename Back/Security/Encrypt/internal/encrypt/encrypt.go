package encrypt

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
)

type Command interface {
	Execute() string
}

type EncryptCommand struct {
	Text string
	Key  []byte
	Iv   []byte
}

func NewEncryptCommand(text string, key, iv []byte) *EncryptCommand {
	return &EncryptCommand{
		Text: text,
		Key:  key,
		Iv:   iv,
	}
}

func (c *EncryptCommand) Execute() string {
	block, _ := aes.NewCipher(c.Key)
	plaintext := []byte(c.Text)
	cfb := cipher.NewCFBEncrypter(block, c.Iv)
	ciphertext := make([]byte, len(plaintext))
	cfb.XORKeyStream(ciphertext, plaintext)
	return base64.StdEncoding.EncodeToString(ciphertext)
}

type Encryptor struct {
	Key []byte
	Iv  []byte
}

func NewEncryptor(key, iv []byte) *Encryptor {
	return &Encryptor{
		Key: key,
		Iv:  iv,
	}
}

func (e *Encryptor) Encrypt(text string) string {
	command := NewEncryptCommand(text, e.Key, e.Iv)
	return command.Execute()
}
