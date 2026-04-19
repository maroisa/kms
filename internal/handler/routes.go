package handler

import (
	"encoding/json"
	"io/fs"
	"kms/internal/middleware"
	"kms/web"
	"log"
	"net/http"
)

const TARGET_URL = "http://localhost:5173/"

func (s *Server) RegisterRoutes() {

	s.Mux.HandleFunc("POST /api/reset_password", s.resetPw)
	s.Mux.HandleFunc("POST /api/login", s.login)
	s.Mux.HandleFunc("POST /api/logout", s.logout)
	s.Mux.HandleFunc("GET /api/ptik", middleware.AuthMiddleware(s.getPtik))
	s.Mux.HandleFunc("GET /api/user", middleware.AuthMiddleware(s.getUser))
	s.Mux.HandleFunc("GET /api/tugas", middleware.AuthMiddleware(s.getTugas))
	s.Mux.HandleFunc("GET /api/tugas/lama", middleware.AuthMiddleware(s.getTugasLama))
	s.Mux.HandleFunc("POST /api/tugas", middleware.AuthMiddleware(s.postTugas))
	s.Mux.HandleFunc("GET /api/tugas/{id}", middleware.AuthMiddleware(s.getTugas))
	s.Mux.HandleFunc("PUT /api/tugas/{id}", middleware.AuthMiddleware(s.putTugas))
	s.Mux.HandleFunc("PATCH /api/user/pfp", middleware.AuthMiddleware(s.patchUserProfile))
	s.Mux.HandleFunc("GET /auth", middleware.AuthMiddleware(s.getAuth))
	s.Mux.Handle("/uploads/", http.StripPrefix("/uploads", http.FileServer(http.Dir("assets/uploads"))))
	s.Mux.Handle("/", s.getIndex())
}

func (s *Server) getIndex() http.Handler {
	webFS, err := fs.Sub(web.WebFS, "build")

	if err != nil {
		log.Fatal("Failed to strip webFS:", err.Error())
	}

	return http.FileServerFS(webFS)
}

func (s *Server) getPtik(w http.ResponseWriter, r *http.Request) {
	list, err := s.DB.GetPtik(r.Context())
	if err != nil {
		http.Error(w, "Failed to get ptik data: "+err.Error(), 500)
		return
	}

	jsonBytes, err := json.Marshal(list)
	if err != nil {
		http.Error(w, "Failed to parse data: "+err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonBytes)
}

func (s *Server) getUser(w http.ResponseWriter, r *http.Request) {
	id := r.Context().Value("id").(int32)
	user, err := s.DB.GetUser(r.Context(), id)
	if err != nil {
		http.Error(w, "failed to get user: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json, err := json.Marshal(user)
	if err != nil {
		http.Error(w, "failed to get user: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(json)
}

func (s *Server) patchUserProfile(w http.ResponseWriter, r *http.Request) {
}
