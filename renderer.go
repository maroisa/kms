package main

import (
	"html/template"
	"net/http"
)

func Render(w http.ResponseWriter, name string, data any) {
	var templates = template.Must(template.ParseGlob("./views/_*.html"))
	templates.ParseFiles("./views/" + name)
	templates.ExecuteTemplate(w, "layout", data)
}
