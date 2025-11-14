package main

import (
	"context"
	"kms/kmsdb"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
)

var queries *kmsdb.Queries

func initializeDB(ctx context.Context) {
	dst := os.Getenv("DATABASE_URL")
	if dst == "" {
		dst = "postgres://rin:blank@localhost:5432/kms?sslmode=disable"
		log.Println("DATABASE_URL is not set! defaulted to:", dst)
	} else {
		log.Println("DATABASE_URL is:", dst)
	}

	conn, err := pgx.Connect(ctx, dst)
	if err != nil {
		log.Fatalln("Database connection error: ", err)
	}
	queries = kmsdb.New(conn)
}
