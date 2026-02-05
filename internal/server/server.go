package server

import (
	"go-maro/internal/db"
	"net/http"
)

type Server struct {
	DB  *db.Queries
	Mux *http.ServeMux
}

func NewServer(db *db.Queries) *Server {
	s := &Server{
		DB:  db,
		Mux: http.NewServeMux(),
	}
	s.RegisterRoutes()
	return s
}
