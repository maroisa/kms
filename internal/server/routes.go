package server

import (
	"context"
	"encoding/json"
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

	s.Mux.HandleFunc("GET /api/ptik", func(w http.ResponseWriter, r *http.Request) {
		list, err := s.DB.GetPtik(context.Background())
		if err != nil {
			http.Error(w, "Failed to get ptik data: "+err.Error(), 500)
		}

		jsonBytes, err := json.Marshal(list)
		if err != nil {
			http.Error(w, "Failed to jsonify data: "+err.Error(), 500)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonBytes)
	})

	s.Mux.Handle("/", http.FileServerFS(webFS))
}
