package middleware

import (
	"context"
	"fmt"
	"kms/internal/utils"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type MyClaims struct {
	UserID int32 `json:"id"`
	jwt.RegisteredClaims
}

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token, err := r.Cookie("token")
		if err != nil {
			log.Println(err.Error())
			http.Error(w, "Unathorized", 401)
			return
		}

		claims, err := verifyToken(token.Value)

		if err != nil {
			http.Error(w, "failed to verify token: "+err.Error(), http.StatusInternalServerError)
			return
		}

		ctx := context.WithValue(r.Context(), "id", claims.UserID)
		r = r.WithContext(ctx)

		next(w, r)
	}
}

func CreateToken(id int32) (string, error) {
	secretKey := []byte(utils.GetSecret())
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  id,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})

	return token.SignedString(secretKey)
}

func verifyToken(tokenStr string) (*MyClaims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &MyClaims{}, func(t *jwt.Token) (any, error) {
		return []byte(utils.GetSecret()), nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return token.Claims.(*MyClaims), nil
}
