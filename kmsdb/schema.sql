CREATE TABLE ptik (
    nim SERIAL PRIMARY KEY NOT NULL,
    nama VARCHAR(64) NOT NULL, 
    tempat_lahir VARCHAR(16) NOT NULL,
    tanggal_lahir DATE NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    nim INTEGER REFERENCES ptik(nim) UNIQUE,
    pfp VARCHAR(16)
);

CREATE TABLE submission (
    id SERIAL PRIMARY KEY NOT NULL,
    user_nim INTEGER REFERENCES users(nim) UNIQUE,
    img VARCHAR(16) UNIQUE
);

CREATE TABLE submission_score (
    id SERIAL PRIMARY KEY NOT NULL,
    user_nim INTEGER REFERENCES users(nim) UNIQUE,
    submission_id INTEGER REFERENCES submission(id)
);
