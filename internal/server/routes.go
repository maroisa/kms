package server

import (
	"io/fs"
	"log"
	"net/http"

	"go-maro/web"
)

func (s *Server) RegisterRoutes() {
	webFS, err := fs.Sub(web.WebFS, "build")
	if err != nil {
		log.Fatal("Failed to strip FS:", err.Error())
	}

	s.Mux.Handle("/", http.FileServerFS(webFS))
}
