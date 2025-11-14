package main

import (
	"html/template"
)

type DashboardItem struct {
	Nama string
	Href string
	Icon template.HTML
}

type JadwalJson struct {
	A interface{} `json:"a"`
	B interface{} `json:"b"`
}
