package main

import (
	"context"
	"kms/internal/db"
	"kms/internal/handler"
	"kms/internal/middleware"
	"kms/internal/utils"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	pool, err := pgxpool.New(context.Background(), utils.GetDatabaseUrl())
	if err != nil {
		log.Fatalln("Unable to create connection pool:", err.Error())
	}

	port := utils.GetPort()
	_ = utils.GetSecret()

	queries := db.New(pool)
	srv := handler.NewServer(queries)

	handler := middleware.Logger(srv.Mux)
	handler = middleware.CORS(handler)

	log.Println("Listening on http://localhost" + port)
	http.ListenAndServe(port, handler)
}
