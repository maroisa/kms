package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
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

	token, err := validateUser(body.Nim, body.Tanggal_lahir)
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

func getPtik(w http.ResponseWriter, r *http.Request) {
	mahasiswa, err := selectPtik()

	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		http.Error(w, "Unable to get data", 500)
		return
	}

	json.NewEncoder(w).Encode(mahasiswa)
}

func getAuth(w http.ResponseWriter, r *http.Request) {}

func getUser(w http.ResponseWriter, r *http.Request) {
	_, claims, _ := jwtauth.FromContext(r.Context())
	nim := claims["nim"].(string)

	w.Header().Set("Content-Type", "application/json")

	if strings.Contains(nim, " ") {
		log.Println("nim ada whitespace")
		http.Error(w, "{}", 400)
		return
	}

	num, err := strconv.Atoi(nim)

	if err != nil {
		log.Println(err)
		http.Error(w, "{}", 400)
		return
	}

	if num > 86 || num < 1 {
		log.Println("nim diluar range")
		http.Error(w, "{}", 400)
		return
	}

	data, err := selectUser(nim)

	if err != nil {
		log.Println(err)
		http.Error(w, "{}", 400)
		return
	}

	json.NewEncoder(w).Encode(data)
}

func PutUser(w http.ResponseWriter, r *http.Request) {
	file, fileHeader, err := r.FormFile("image")
	if err != nil {
		log.Println(err)
		http.Error(w, "something wrong", http.StatusBadRequest)
		return
	}

	defer file.Close()

	uploadDir := "./uploads/pfp"
	hashedName := createHashName(file, fileHeader)

	file.Seek(0, 0)

	os.MkdirAll(uploadDir, os.ModePerm)
	dst, err := os.Create(filepath.Join(uploadDir, hashedName))

	if err != nil {
		http.Error(w, "Unable to create the file for writing", 500)
		return
	}

	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		http.Error(w, "Unable to save file", 500)
	}

	_, claims, _ := jwtauth.FromContext(r.Context())
	nim := claims["nim"].(string)

	err = updateUserPfp(nim, hashedName)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to update profile", 500)
	}

	w.Write([]byte("OK"))
}

func getSubmission(w http.ResponseWriter, r *http.Request) {
	_, claims, _ := jwtauth.FromContext(r.Context())
	nim := claims["nim"].(string)

	submission, err := selectSubmission(nim)
	if err != nil {
		log.Println(err)
		http.Error(w, "error getting data", 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if len(submission) == 0 {
		w.Write([]byte("{}"))
		return
	}
	json.NewEncoder(w).Encode(submission)
}

func postSubmission(w http.ResponseWriter, r *http.Request) {
	file, fileHeader, err := r.FormFile("image")
	if err != nil {
		log.Println(err)
		http.Error(w, "something wrong", http.StatusBadRequest)
		return
	}

	defer file.Close()

	uploadDir := "./uploads/submission"
	hashedName := createHashName(file, fileHeader)
	file.Seek(0, 0)

	os.MkdirAll(uploadDir, os.ModePerm)
	dst, err := os.Create(filepath.Join(uploadDir, hashedName))

	if err != nil {
		http.Error(w, "Unable to create the file for writing", 500)
		return
	}

	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		http.Error(w, "Unable to save file", 500)
	}

	_, claims, _ := jwtauth.FromContext(r.Context())
	nim := claims["nim"].(string)

	err = insertSubmission(nim, hashedName)
	if err != nil {
		log.Println(err)
		http.Error(w, "unable to insert submission", 500)
		return
	}

	w.Write([]byte("OK"))
}

func postSubmissionScore(w http.ResponseWriter, r *http.Request) {
	submission_id := chi.URLParam(r, "submission_id")

	if submission_id == "" {
		http.Error(w, "No data provided", 400)
		return
	}

	_, claims, _ := jwtauth.FromContext(r.Context())
	nim := claims["nim"].(string)

	err := insertSubmissionScore(nim, submission_id)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error inserting score", 500)
		return
	}

	w.Write([]byte("OK"))
}
