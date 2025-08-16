package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
)

var secret *jwtauth.JWTAuth

func main() {
	port := "5000"
	envPort := os.Getenv("PORT")
	secret = jwtauth.New("HS256", []byte("pitikpetok24"), nil)

	initializeDB()

	if envPort != "" {
		port = envPort
		log.Println("PORT env is found, set to:", port)
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
	}))

	r.Get("/", getRoot)
	r.Post("/login", postLogin)
	r.Post("/logout", postLogout)

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(secret))
		r.Use(jwtauth.Authenticator(secret))
		r.Get("/auth", getAuth)
		r.Get("/ptik", getPtik)
		r.Get("/user", getUser)
		r.Put("/user", PutUser)
		r.Get("/submission", getSubmission)
		r.Post("/submission", postSubmission)
		r.Post("/submission/score/{submission_id}", postSubmissionScore)
		r.Handle("/uploads/*", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))
	})

	log.Println("Listening on http://127.0.0.1:" + port)
	http.ListenAndServe(":"+port, r)
}
