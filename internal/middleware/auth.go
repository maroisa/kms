package middleware

import (
	"context"
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"io"
	"kms/internal/server"
	"log"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

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

func createHashName(r io.Reader, fileHeader *multipart.FileHeader) string {
	newHash := sha1.New()
	_, err := io.Copy(newHash, r)

	if err != nil {
		return ""
	}

	hashHex := hex.EncodeToString(newHash.Sum(nil))
	shorthash := hashHex[:8]
	return shorthash + filepath.Ext(fileHeader.Filename)
}

func createToken(nim int32) (string, error) {
	secretKey := server.GetSecret()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"nim": nim,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})

	return token.SignedString(secretKey)
}

func verifyToken(tokenStr string) (map[string]any, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (any, error) {
		return []byte(server.GetSecret()), nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return token.Claims.(jwt.MapClaims), nil
}
