package main

type Mahasiswa struct {
	Nama         string `json:"nama"`
	Nim          int    `json:"nim"`
	TanggalLahir string `json:"tanggal_lahir"`
	TempatLahir  string `json:"tempat_lahir"`
}

type User struct {
	Nama         string `json:"nama"`
	Nim          int    `json:"nim"`
	TanggalLahir string `json:"tanggal_lahir"`
	TempatLahir  string `json:"tempat_lahir"`
	Pfp          string `json:"pfp"`
}

type Submission struct {
	Id       int    `json:"id"`
	Img      string `json:"img"`
	Votes    int    `json:"votes"`
	Voted    bool   `json:"voted"`
	UserNama string `json:"nama"`
	UserPfp  string `json:"pfp"`
}

type SubmissionScore struct {
	SubmissionId int `json:"submission_id"`
	Votes        int `json:"votes"`
}

type SubmissionScoreBody struct {
	UserNim      string `json:"user_id"`
	SubmissionId string `json:"submission_id"`
}
