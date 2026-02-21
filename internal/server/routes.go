package server

import (
	"context"
	"encoding/json"
	"io/fs"
	"kms/internal/db"
	"kms/internal/middleware"
	"kms/web"
	"log"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"golang.org/x/crypto/bcrypt"
)

const TARGET_URL = "http://localhost:5173/"

func (s *Server) RegisterRoutes() {

	s.Mux.HandleFunc("POST /api/reset_password", s.resetPw)
	s.Mux.HandleFunc("POST /api/login", s.postLogin)
	s.Mux.HandleFunc("POST /api/logout", s.logout)
	s.Mux.HandleFunc("GET /api/ptik", middleware.AuthMiddleware(s.getPtik))
	s.Mux.HandleFunc("GET /api/user", middleware.AuthMiddleware(s.getUser))
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

func (s *Server) postLogin(w http.ResponseWriter, r *http.Request) {
	nim := r.FormValue("nim")
	if nim == "" {
		http.Error(w, "nim empty!", 400)
		return
	}

	password := r.FormValue("password")
	if password == "" {
		http.Error(w, "password empty!", 400)
		return
	}

	res, err := s.DB.CheckUser(context.Background(), nim)
	if err != nil {
		http.Error(w, "failed to get user: "+err.Error(), 500)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(res.Password.String), []byte(password))
	if err != nil {
		http.Error(w, "failed to validate: "+err.Error(), 400)
		return
	}

	token, err := middleware.CreateToken(res.ID)
	if err != nil {
		http.Error(w, "failed to create token: "+err.Error(), 500)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Now().Add(time.Hour * 168),
	})

	w.Write([]byte("OK"))
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

func (s *Server) logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Now(),
	})

	w.Write([]byte("OK"))
}

func (s *Server) resetPw(w http.ResponseWriter, r *http.Request) {
	nim := r.FormValue("nim")
	if nim == "" {
		http.Error(w, "nim empty!", 400)
		return
	}

	tanggalLahir, err := time.Parse("2006-01-02", r.FormValue("tanggal_lahir"))
	if err != nil {
		http.Error(w, "failed to parse tanggal_lahir!", 400)
		return
	}

	password := r.FormValue("password")
	if password == "" {
		http.Error(w, "password empty!", 400)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "failed to update password: "+err.Error(), 500)
		return
	}

	err = s.DB.UpdatePassword(r.Context(), db.UpdatePasswordParams{
		Nim:          nim,
		TanggalLahir: pgtype.Date{Time: tanggalLahir, Valid: true},
		Password:     pgtype.Text{String: string(hashedPassword), Valid: true},
	})

	if err != nil {
		http.Error(w, "failed to update password: "+err.Error(), 500)
		return
	}

	w.Write([]byte("OK"))
}

func (s *Server) getAuth(w http.ResponseWriter, r *http.Request) {}

func (s *Server) patchUserProfile(w http.ResponseWriter, r *http.Request) {
}
