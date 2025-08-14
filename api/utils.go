package main

import (
	"crypto/sha1"
	"encoding/hex"
	"io"
	"mime/multipart"
	"path/filepath"
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
