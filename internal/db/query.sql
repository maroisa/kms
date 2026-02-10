-- name: GetPtik :many
select * from ptik;

-- name: CheckUser :one
select users.id, password from users join ptik using (id) where nim = $1;

-- name: UpdatePassword :exec
update users set password = $1 from ptik where users.id = ptik.id and nim = $2 and tanggal_lahir = $3;

-- name: GetUser :one
select users.id, pfp, nim, nama, tempat_lahir, tanggal_lahir, angkatan from users join ptik using (id) where users.id = $1 LIMIT 1;
