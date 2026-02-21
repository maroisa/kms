-- +goose Up
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128),
    content TEXT,
    user_id INTEGER REFERENCES users (id),
    created_at DATE DEFAULT CURRENT_DATE
);

-- +goose Down
DROP TABLE IF EXISTS posts;
