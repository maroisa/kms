CREATE TABLE ptik (
    id SERIAL PRIMARY KEY,
    nim VARCHAR(64) NOT NULL UNIQUE,
    nama VARCHAR(64) NOT NULL,
    tempat_lahir VARCHAR(16) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    angkatan INTEGER
);

CREATE TABLE users (
    id INT PRIMARY KEY REFERENCES ptik (id),
    password VARCHAR(128),
    pfp VARCHAR(16)
);

CREATE TABLE submission (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users (id) UNIQUE,
    img VARCHAR(16) UNIQUE
);

CREATE TABLE submission_score (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users (id) UNIQUE,
    submission_id INTEGER REFERENCES submission (id)
);
