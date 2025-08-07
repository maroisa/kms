package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/jwtauth/v5"
)

func getRoot(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("OK"))
}

func postLogout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Now().Add(-1),
	})
}

func postLogin(w http.ResponseWriter, r *http.Request) {
	nim := r.FormValue("nim")
	tanggal_lahir := r.FormValue("tanggal_lahir")

	if nim == "" || tanggal_lahir == "" {
		w.WriteHeader(400)
		w.Write([]byte("data missing"))
		return
	}

	token := selectAuthorized(nim, tanggal_lahir)
	if token == "" {
		w.WriteHeader(400)
		w.Write([]byte("Not Authorized"))
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Now().Add(time.Hour * 720),
	})

	w.WriteHeader(200)
}

func getAllPtik(w http.ResponseWriter, r *http.Request) {
	mahasiswa, err := selectAllPtik()

	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("{}"))
		return
	}

	json.NewEncoder(w).Encode(mahasiswa)
}

func getPtik(w http.ResponseWriter, r *http.Request) {
	_, claims, _ := jwtauth.FromContext(r.Context())
	nim := claims["nim"].(string)

	w.Header().Set("Content-Type", "application/json")

	if strings.Contains(nim, " ") {
		w.WriteHeader(400)
		w.Write([]byte("{}"))
		return
	}

	num, err := strconv.Atoi(nim)

	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("{}"))
		return
	}

	if num > 86 || num < 1 {
		w.WriteHeader(400)
		w.Write([]byte("{}"))
		return
	}

	data, err := selectPtik(nim)
	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("{}"))
		return
	}

	json.NewEncoder(w).Encode(data)
}
