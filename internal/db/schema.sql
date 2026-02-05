CREATE TABLE ptik (
    nim SERIAL PRIMARY KEY NOT NULL,
    nama VARCHAR(64) NOT NULL, 
    tempat_lahir VARCHAR(16) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    angkatan INTEGER
);

CREATE TABLE users (
    nim INTEGER PRIMARY KEY REFERENCES ptik(nim),
    password VARCHAR(16),
    pfp VARCHAR(16)
);
