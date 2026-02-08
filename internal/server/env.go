package server

import (
	"log"
	"os"
)

func GetDatabaseUrl() string {
	url := os.Getenv("DATABASE_URL")
	if url == "" {
		log.Fatal("DATABASE_URL is not set!")
	}

	return url
}

func GetPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = ":3000"
		log.Println("PORT is not set. Default to :3000")
	}
	return port
}

func GetSecret() string {
	secret := os.Getenv("SECRET")
	if secret == "" {
		log.Fatal("SECRET is not set!")
	}
	return secret
}
