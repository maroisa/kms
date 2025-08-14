package main

import (
	"database/sql"
	"errors"
	"log"
	"os"

	_ "github.com/lib/pq"
)

type Mahasiswa struct {
	Nama          string `json:"nama"`
	Nim           int    `json:"nim"`
	Tanggal_lahir string `json:"tanggal_lahir"`
	Tempat_lahir  string `json:"tempat_lahir"`
}

type User struct {
	Nama          string `json:"nama"`
	Nim           int    `json:"nim"`
	Tanggal_lahir string `json:"tanggal_lahir"`
	Tempat_lahir  string `json:"tempat_lahir"`
	Pfp           string `json:"pfp"`
}

var db *sql.DB

func initializeDB() {
	dbUrl := os.Getenv("DATABASE_URL")

	if dbUrl == "" {
		dbUrl = "postgres://rin:blank@127.0.0.1:5432/kms?sslmode=disable"
		log.Println("DATABASE_URL is not set! defaulted to:", dbUrl)
	} else {
		log.Println("DATABASE_URL is:", dbUrl)
	}

	DB, err := sql.Open("postgres", dbUrl)
	if err != nil {
		log.Fatal(err)
	}

	db = DB

}

func selectPtik() ([]Mahasiswa, error) {
	rows, err := db.Query("SELECT nim, nama, tempat_lahir, tanggal_lahir FROM ptik")

	if err != nil {
		return nil, err
	}

	var mahasiswa []Mahasiswa

	defer rows.Close()
	for rows.Next() {
		var m Mahasiswa

		err = rows.Scan(&m.Nim, &m.Nama, &m.Tempat_lahir, &m.Tanggal_lahir)
		if err != nil {
			return nil, err
		}

		mahasiswa = append(mahasiswa, m)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return mahasiswa, nil
}

func validateUser(nim string, tanggal_lahir string) (string, error) {
	queryString := "SELECT id, nim FROM users " +
		"JOIN ptik using (nim) " +
		"where nim=" + nim + " and tanggal_lahir='" + tanggal_lahir + "'"

	rows, err := db.Query(queryString)
	if err != nil {
		return "", err
	}

	var rowsId string
	var rowsNim string

	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&rowsId, &rowsNim)
		if err != nil {
			return "", err
		}
	}

	err = rows.Err()
	if err != nil {
		return "", err
	}

	if rowsId == "" || rowsNim == "" {
		return "", errors.New("user not found")
	}

	_, tokenString, err := secret.Encode(map[string]interface{}{
		"nim": nim,
	})

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func selectUser(nim string) (User, error) {

	rows, err := db.Query("SELECT nim, nama, tempat_lahir, tanggal_lahir, COALESCE(pfp, '') FROM users "+
		"JOIN ptik using (nim) "+
		"WHERE nim = $1", nim)

	if err != nil {
		return User{}, err
	}

	defer rows.Close()

	var u User

	for rows.Next() {
		err = rows.Scan(&u.Nim, &u.Nama, &u.Tempat_lahir, &u.Tanggal_lahir, &u.Pfp)
		if err != nil {
			return User{}, err
		}
	}

	err = rows.Err()
	if err != nil {
		return User{}, err
	}

	return u, nil

}

func updateUserPfp(nim string, imageUrl string) error {
	queryString := "UPDATE users SET pfp='" + imageUrl + "' where nim=" + nim
	log.Println(queryString)
	rows, err := db.Query(queryString)
	if err != nil {
		log.Println(err)
		return err
	}

	defer rows.Close()

	err = rows.Err()
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}
