package main

import (
	"context"
	"kms/internal/db"
	"kms/internal/middleware"
	"kms/internal/server"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	pool, err := pgxpool.New(context.Background(), server.GetDatabaseUrl())
	if err != nil {
		log.Fatalln("Unable to create connection pool:", err.Error())
	}

	port := server.GetPort()
	_ = server.GetSecret()

	queries := db.New(pool)
	srv := server.NewServer(queries)

	handler := middleware.Logger(srv.Mux)
	handler = middleware.CORS(handler)

	log.Println("Listening on http://localhost" + port)
	http.ListenAndServe(port, handler)
}
