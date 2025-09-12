package main

import (
	"database/sql"
	"errors"
	"log"
	"os"

	_ "github.com/lib/pq"
)

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

		err = rows.Scan(&m.Nim, &m.Nama, &m.TempatLahir, &m.TanggalLahir)
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
	var rowsId string
	var rowsNim string

	queryString := "SELECT id, nim FROM users " +
		"JOIN ptik using (nim) " +
		"where nim=" + nim + " and tanggal_lahir='" + tanggal_lahir + "'"

	row := db.QueryRow(queryString)
	err := row.Scan(&rowsId, &rowsNim)
	if err != nil {
		return "", err
	}

	err = row.Err()

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
	var u User

	row := db.QueryRow("SELECT nim, nama, tempat_lahir, tanggal_lahir, COALESCE(pfp, '') FROM users "+
		"JOIN ptik using (nim) "+
		"WHERE nim = $1", nim)

	err := row.Scan(&u.Nim, &u.Nama, &u.TempatLahir, &u.TanggalLahir, &u.Pfp)

	if err != nil {
		return User{}, err
	}

	err = row.Err()

	if err != nil {
		return User{}, err
	}

	return u, nil

}

func updateUserPfp(nim string, imageUrl string) error {
	queryString := "UPDATE users SET pfp='" + imageUrl + "' where nim=" + nim
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

func selectSubmission(user_nim string) ([]Submission, error) {
	queryString := "SELECT s.id, img, " +
		"COALESCE((SELECT COUNT(user_nim) FROM submission_score WHERE submission_id=s.id GROUP BY submission_id), 0) as votes, " +
		"p.nama, COALESCE(pfp, '') as user_pfp, " +
		"(SELECT EXISTS(SELECT 1 FROM submission_score WHERE submission_id=s.id AND user_nim=" + user_nim + ")) " +
		"FROM submission s " +
		"JOIN users u ON s.user_nim=u.nim " +
		"JOIN ptik p ON p.nim=u.nim"

	rows, err := db.Query(queryString)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var submissions []Submission

	for rows.Next() {
		var s Submission
		err = rows.Scan(&s.Id, &s.Img, &s.Votes, &s.UserNama, &s.UserPfp, &s.Voted)
		if err != nil {
			return nil, err
		}
		submissions = append(submissions, s)
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return submissions, nil
}

func insertSubmission(user_nim string, img string) error {
	var exists bool
	err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM submission WHERE img = $1)", img).Scan(&exists)
	if err != nil {
		return err
	}
	if exists {
		return errors.New("image duplication")
	}

	queryString := "INSERT INTO submission (user_nim, img) " +
		"VALUES (" + user_nim + ",'" + img + "') " +
		"ON CONFLICT (img) DO NOTHING"
	_, err = db.Exec(queryString)
	if err != nil {
		return err
	}

	return nil
}

func insertSubmissionScore(user_nim string, submission_id string) error {
	queryString := "INSERT INTO submission_score (user_nim, submission_id) " +
		"VALUES (" + user_nim + "," + submission_id + ")" +
		"ON CONFLICT (user_nim) DO UPDATE SET submission_id=" + submission_id

	_, err := db.Exec(queryString)
	if err != nil {
		return err
	}

	return nil
}
