package main

import (
	"context"
	"log"
	"net/http"
)

func LoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token, err := r.Cookie("token")
		if err != nil {
			http.Redirect(w, r, "/login", http.StatusSeeOther)
			return
		}

		claims, err := verifyToken(token.Value)

		if err != nil {
			log.Println(err)
			http.Redirect(w, r, "/login", http.StatusSeeOther)
		}

		ctx := context.WithValue(r.Context(), "nim", claims["nim"])
		r = r.WithContext(ctx)

		next(w, r)
	}
}
