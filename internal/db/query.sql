-- name: GetPtik :many
select * from ptik;

-- name: CheckUser :one
select users.id, password from users join ptik using (id) where nim = $1;

-- name: UpdatePassword :exec
update users set password = $1 from ptik where users.id = ptik.id and nim = $2 and tanggal_lahir = $3;

-- name: GetUser :one
select users.id, pfp, nim, nama, tempat_lahir, tanggal_lahir, angkatan from users join ptik using (id) where users.id = $1 LIMIT 1;

-- name: ListTugas :many
select * from tugas where deadline >= CURRENT_DATE;

-- name: ListTugasLama :many
select * from tugas where deadline <= CURRENT_DATE;

-- name: GetTugas :one
select * from tugas where id = $1;

-- name: UpdateTugas :exec
update tugas set nama = $2, matkul = $3, deskripsi = $4, deadline = $5, link = $6 where id = $1;

-- name: CreateTugas :exec
insert into tugas (nama, matkul, deskripsi, deadline, link) values ($1, $2, $3, $4, $5);
