package main

import (
	"log"
	"net/http"
)

func main() {

	mux := http.NewServeMux()
	registerRoutes(mux)

	PORT := ":3000"
	log.Println("Listening on port", PORT)
	http.ListenAndServe(PORT, LoggerMiddleware(mux))
}
