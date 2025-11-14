-- name: ListMahasiswa :many
SELECT CONCAT('K35240', LPAD(nim::text, 2, '0')) as nim, nama, tempat_lahir, TO_CHAR(tanggal_lahir, 'YYYY-MM-DD') as tanggal_lahir FROM ptik;

-- name: CheckUser :one
SELECT u.nim FROM users u JOIN ptik p using (nim) where u.nim=$1 and p.tanggal_lahir=$2 LIMIT 1;

-- name: GetUser :one
SELECT CONCAT('K35240', LPAD(p.nim::text, 2, '0')) as nim, p.nama, p.tempat_lahir, TO_CHAR(p.tanggal_lahir, 'YYYY-MM-DD') as tanggal_lahir, COALESCE(pfp, '') FROM users u JOIN ptik p using (nim) WHERE u.nim = $1 LIMIT 1;

-- name: UpdateProfilePicture :exec
UPDATE users SET pfp=$1 where nim=$2;

-- name: ListSubmission :many
SELECT s.id, img::text, COALESCE((SELECT COUNT(user_nim) FROM submission_score WHERE submission_id=s.id 
GROUP BY submission_id), 0) as votes, p.nama, COALESCE(pfp, '') as user_pfp, 
(SELECT EXISTS(SELECT 1 FROM submission_score WHERE submission_id=s.id AND s.user_nim=$1)) FROM submission s
JOIN users u ON s.user_nim=u.nim
JOIN ptik p ON p.nim=u.nim;

-- name: CheckSubmission :exec
SELECT EXISTS(SELECT 1 FROM submission WHERE img = $1);

-- name: AddSubmission :exec
INSERT INTO submission (user_nim, img) VALUES ($1, $2) ON CONFLICT (img) DO NOTHING;

-- name: AddScore :exec

INSERT INTO submission_score (user_nim, submission_id) VALUES ($1, $2) 
ON CONFLICT (user_nim) DO UPDATE SET submission_id=$2;