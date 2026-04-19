package handler

import (
	"context"
	"kms/internal/db"
	"kms/internal/middleware"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"golang.org/x/crypto/bcrypt"
)

func (s *Server) resetPw(w http.ResponseWriter, r *http.Request) {
	nim := r.FormValue("nim")
	if nim == "" {
		http.Error(w, "nim kosong!", 400)
		return
	}

	tanggalLahir, err := time.Parse("2006-01-02", r.FormValue("tanggal_lahir"))
	if err != nil {
		http.Error(w, "gagal mendapatkan tanggal_lahir!", 400)
		return
	}

	password := r.FormValue("password")
	if password == "" {
		http.Error(w, "password kosong!", 400)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "gagal mengupdate password: "+err.Error(), 500)
		return
	}

	err = s.DB.UpdatePassword(r.Context(), db.UpdatePasswordParams{
		Nim:          nim,
		TanggalLahir: pgtype.Date{Time: tanggalLahir, Valid: true},
		Password:     pgtype.Text{String: string(hashedPassword), Valid: true},
	})

	if err != nil {
		http.Error(w, "gagal mengupdate password: "+err.Error(), 500)
		return
	}

	w.Write([]byte("OK"))
}

func (s *Server) login(w http.ResponseWriter, r *http.Request) {
	nim := r.FormValue("nim")
	if nim == "" {
		http.Error(w, "nim kosong!", 400)
		return
	}

	password := r.FormValue("password")
	if password == "" {
		http.Error(w, "password kosong!", 400)
		return
	}

	res, err := s.DB.CheckUser(context.Background(), nim)
	if err != nil {
		http.Error(w, "gagal mendapatkan user: "+err.Error(), 500)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(res.Password.String), []byte(password))
	if err != nil {
		http.Error(w, "gagal memvalidasi: "+err.Error(), 400)
		return
	}

	token, err := middleware.CreateToken(res.ID)
	if err != nil {
		http.Error(w, "gagal membuat token: "+err.Error(), 500)
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

func (s *Server) getAuth(w http.ResponseWriter, r *http.Request) {}
