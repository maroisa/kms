package main

import (
	"context"
	"log"
	"net/http"
)

func main() {
	ctx := context.Background()
	initializeDB(ctx)

	mux := http.NewServeMux()
	registerRoutes(mux)

	PORT := ":3000"
	log.Println("Listening on port", PORT)
	http.ListenAndServe(PORT, LoggerMiddleware(mux))
}
