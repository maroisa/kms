package main

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"io"
	"mime/multipart"
	"path/filepath"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

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
	secretKey := []byte("pitikpetok24")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"nim": nim,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})

	return token.SignedString(secretKey)
}

func verifyToken(tokenStr string) (map[string]any, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (any, error) {
		return []byte("pitikpetok24"), nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return token.Claims.(jwt.MapClaims), nil
}
