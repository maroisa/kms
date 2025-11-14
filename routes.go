package main

import (
	"io"
	"kms/kmsdb"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func registerRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /{$}", getIndex)
	mux.HandleFunc("GET /login", getLogin)
	mux.HandleFunc("POST /login", postLogin)
	mux.HandleFunc("GET /logout", getLogout)
	mux.HandleFunc("GET /ptik", getPtik)
	mux.HandleFunc("GET /jadwal", redirectJadwal)
	mux.HandleFunc("GET /jadwal/{kelas}", getJadwal)
	mux.Handle("GET /dashboard", AuthMiddleware(getDashboard))
	mux.Handle("GET /profile", AuthMiddleware(getProfile))
	mux.Handle("GET /submission", AuthMiddleware(getSubmission))

	assetFS := http.FileServer(http.Dir("./assets/"))
	mux.Handle("/assets/", http.StripPrefix("/assets", assetFS))

	pfpFS := http.FileServer(http.Dir("./uploads/pfp/"))
	mux.Handle("/uploads/pfp/", http.StripPrefix("/uploads/pfp/", pfpFS))

	submissionFS := http.FileServer(http.Dir("./uploads/submission/"))
	mux.Handle("/uploads/submission/", http.StripPrefix("/uploads/submission/", submissionFS))
}

func getIndex(w http.ResponseWriter, r *http.Request) {
	Render(w, "index.html", nil)
}

func getLogin(w http.ResponseWriter, r *http.Request) {
	Render(w, "login.html", nil)
}

func postLogin(w http.ResponseWriter, r *http.Request) {
	var formValue kmsdb.CheckUserParams

	nim, err := strconv.Atoi(r.FormValue("nim"))
	if err != nil {
		log.Println(err)
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}
	tanggal_lahir, err := time.Parse("2006-01-02", r.FormValue("tanggal_lahir"))
	if err != nil {
		log.Println(err)
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	formValue.Nim = pgtype.Int4{Int32: int32(nim), Valid: true}
	formValue.TanggalLahir = pgtype.Date{Time: tanggal_lahir, Valid: true}
	res, err := queries.CheckUser(r.Context(), formValue)
	if err != nil {
		log.Println(err)
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	token, err := createToken(res.Int32)
	if err != nil {
		log.Println(err)
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Expires:  time.Now().Add(time.Hour * 72),
	})

	http.Redirect(w, r, "/dashboard", http.StatusSeeOther)
}

func getDashboard(w http.ResponseWriter, r *http.Request) {
	Render(w, "dashboard.html", []DashboardItem{
		{
			Nama: "Mahasiswa PTIK",
			Href: "/ptik",
			Icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-8 sm:size-10\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z\" /></svg>",
		},
		{
			Nama: "Profil",
			Href: "/profile",
			Icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-8 sm:size-10\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z\" /></svg>",
		},
		{
			Nama: "Submission",
			Href: "/submission",
			Icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-8 sm:size-10\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z\" /></svg>",
		},
		{
			Nama: "Jadwal",
			Href: "/jadwal",
			Icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-8 sm:size-10\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5\" /></svg>",
		},
	})
}

func getPtik(w http.ResponseWriter, r *http.Request) {
	hasil, err := queries.ListMahasiswa(r.Context())
	if err != nil {
		log.Println("Error:", err)
	}

	Render(w, "ptik.html", hasil)
}

func getProfile(w http.ResponseWriter, r *http.Request) {
	nim := r.Context().Value("nim")
	res, err := queries.GetUser(r.Context(), pgtype.Int4{Int32: int32(nim.(float64)), Valid: true})
	if err != nil {
		log.Println("Error:", err)
		return
	}

	Render(w, "profile.html", res)
}

func getSubmission(w http.ResponseWriter, r *http.Request) {
	submission, err := queries.GetSubmission(r.Context(), pgtype.Int4{Int32: 4})
	if err != nil {
		log.Println("Error:", err)
	}

	log.Println(submission)

	Render(w, "submission.html", nil)
}

func putUser(w http.ResponseWriter, r *http.Request) {
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

	// _, claims, _ := jwtauth.FromContext(r.Context())
	// nim := claims["nim"].(string)

	// err = updateUserPfp(nim, hashedName)
	// if err != nil {
	// 	log.Println(err)
	// 	http.Error(w, "Unable to update profile", 500)
	// }

	w.Write([]byte("OK"))
}

func redirectJadwal(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/jadwal/a", http.StatusPermanentRedirect)
}

func getJadwal(w http.ResponseWriter, r *http.Request) {
	Render(w, "jadwal.html", nil)
}

func getLogout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		Expires:  time.Now(),
		HttpOnly: true,
	})
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
