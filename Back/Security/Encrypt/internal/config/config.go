package config

import (
	"os"
	"strings"

	"github.com/joho/godotenv"
)

var (
	AESKey      string
	AESIv       string
	Port        string
	CORSOrigins []string
)

func LoadConfig() {
	_ = godotenv.Load()
	AESKey = os.Getenv("AES_KEY")
	if AESKey == "" {
		AESKey = "12345678901234567890123456789012"
	}
	AESIv = os.Getenv("AES_IV")
	if AESIv == "" {
		AESIv = "1234567890123456"
	}
	Port = os.Getenv("PORT")
	if Port == "" {
		Port = "4005"
	}
	CORSOrigins = strings.Split(os.Getenv("CORS_ORIGIN"), ",")
}
