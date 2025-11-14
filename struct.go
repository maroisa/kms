package main

import "html/template"

type DashboardItem struct {
	Nama string
	Href string
	Icon template.HTML
}
type LoginValue struct {
	Nim          string `json:"nim"`
	TanggalLahir string `json:"tanggal_lahir"`
}

type JadwalJson struct {
	A interface{} `json:"a"`
	B interface{} `json:"b"`
}
