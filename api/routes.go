package main

import (
	"encoding/json"
	"log"
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

type LoginData struct {
	Nim           string `json:"nim"`
	Tanggal_lahir string `json:"tanggal_lahir"`
}

func postLogin(w http.ResponseWriter, r *http.Request) {
	var body LoginData

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, "data missing", 400)
		return
	}

	token, err := selectUser(body.Nim, body.Tanggal_lahir)
	if err != nil {
		log.Println(err)
		http.Error(w, "not authorized", 400)
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
		http.Error(w, "{}", 400)
		return
	}

	json.NewEncoder(w).Encode(mahasiswa)
}

func getAuth(w http.ResponseWriter, r *http.Request) {}

func getPtik(w http.ResponseWriter, r *http.Request) {
	_, claims, _ := jwtauth.FromContext(r.Context())
	nim := claims["nim"].(string)

	w.Header().Set("Content-Type", "application/json")

	if strings.Contains(nim, " ") {
		http.Error(w, "{}", 400)
		return
	}

	num, err := strconv.Atoi(nim)

	if err != nil {
		http.Error(w, "{}", 400)
		return
	}

	if num > 86 || num < 1 {
		http.Error(w, "{}", 400)
		return
	}

	data, err := selectPtik(nim)
	if err != nil {
		http.Error(w, "{}", 400)
		return
	}

	json.NewEncoder(w).Encode(data)
}
