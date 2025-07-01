package main

import (
	"fmt"
	"net/http"

	"soapencryptor/internal/config"
	"soapencryptor/internal/handler"
	"soapencryptor/internal/middleware"
)

func main() {
	config.LoadConfig()
	http.HandleFunc("/", middleware.WithCORS(handler.SoapHandler, config.CORSOrigins))
	fmt.Println("🟢 SOAP Server listening on http://localhost:" + config.Port)
	http.ListenAndServe(":"+config.Port, nil)
}
