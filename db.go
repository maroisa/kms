package main

import (
	"context"
	"kms/kmsdb"
	"log"

	"github.com/jackc/pgx/v5"
)

var queries *kmsdb.Queries

func initializeDB(ctx context.Context) {
	conn, err := pgx.Connect(ctx, "postgres://rin:blank@localhost/kms")
	if err != nil {
		log.Fatalln("Database connection error: ", err)
	}
	queries = kmsdb.New(conn)
}
