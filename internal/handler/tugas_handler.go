package handler

import (
	"encoding/json"
	"kms/internal/db"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Server) getTugas(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		tugas, err := s.DB.ListTugas(r.Context())
		if err != nil {
			log.Println(err.Error())
			http.Error(w, "Gagal mengambil data tugas", 500)
			return
		}

		jsonString, err := json.Marshal(tugas)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, "Gagal mengkonversi data tugas", 500)
			return
		}

		w.Header().Set("content-type", "application/json")
		w.Write(jsonString)
		return
	}

	tugasID, err := strconv.Atoi(id)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Gagal mendapatkan id tugas", 400)
	}

	tugas, err := s.DB.GetTugas(r.Context(), int32(tugasID))
	if err != nil {
		http.Error(w, "ID tidak ditemukan!", 400)
		return
	}

	jsonString, err := json.Marshal(tugas)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Gagal mengkonversi data tugas", 500)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.Write(jsonString)
}

func (s *Server) getTugasLama(w http.ResponseWriter, r *http.Request) {
	tugas, err := s.DB.ListTugasLama(r.Context())
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Gagal mengambil data tugas", 500)
		return
	}

	jsonString, err := json.Marshal(tugas)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Gagal mengkonversi data tugas", 500)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.Write(jsonString)
}

func (s *Server) putTugas(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		log.Println("ID kosong!")
		http.Error(w, "Bad Request", 400)
		return
	}

	tugasID, err := strconv.Atoi(id)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Gagal mendapatkan id tugas", 400)
		return
	}

	nama := r.FormValue("nama")
	if nama == "" {
		log.Println("nama kosong!")
		http.Error(w, "Nama tugas kosong!", 400)
		return
	}

	deskripsi := r.FormValue("deskripsi")
	if deskripsi == "" {
		log.Println("deskripsi kosong!")
		http.Error(w, "Deskripsi kosong!", 400)
		return
	}

	matkul := r.FormValue("matkul")
	if matkul == "" {
		log.Println("matkul kosong!")
		http.Error(w, "matkul kosong!", 400)
		return
	}

	deadline, err := time.Parse("2006-01-02", r.FormValue("deadline"))
	if err != nil {
		http.Error(w, "failed to parse tanggal_lahir!", 400)
		return
	}
	s.DB.UpdateTugas(r.Context(), db.UpdateTugasParams{
		ID:        int32(tugasID),
		Nama:      nama,
		Matkul:    matkul,
		Deskripsi: deskripsi,
		Deadline:  pgtype.Date{Time: deadline, Valid: true},
		Link: pgtype.Text{
			String: r.FormValue("link"),
			Valid:  true,
		},
	})
}

func (s *Server) postTugas(w http.ResponseWriter, r *http.Request) {
	nama := r.FormValue("nama")
	if nama == "" {
		log.Println("nama kosong!")
		http.Error(w, "Nama tugas kosong!", 400)
		return
	}

	deskripsi := r.FormValue("deskripsi")
	if deskripsi == "" {
		log.Println("deskripsi kosong!")
		http.Error(w, "Deskripsi kosong!", 400)
		return
	}

	matkul := r.FormValue("matkul")
	if matkul == "" {
		log.Println("matkul kosong!")
		http.Error(w, "matkul kosong!", 400)
		return
	}

	deadline, err := time.Parse("2006-01-02", r.FormValue("deadline"))
	if err != nil {
		http.Error(w, "failed to parse tanggal_lahir!", 400)
		return
	}

	s.DB.CreateTugas(r.Context(), db.CreateTugasParams{
		Nama:      nama,
		Matkul:    matkul,
		Deskripsi: deskripsi,
		Deadline:  pgtype.Date{Time: deadline, Valid: true},
		Link:      pgtype.Text{String: r.FormValue("link"), Valid: true},
	})
}
