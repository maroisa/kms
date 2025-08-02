# KMS

aplikasi web untuk member KMS. dibuat menggunakan
[SvelteKit](https://svelte.dev/) dengan styling
[DaisyUI]("https://daisyui.com/") dan [TailwindCSS](https://tailwindcss.com/).

## Setup

### Prerequisite

- NodeJS >= 20
- PostgreSQL

### Clone repository

```bash
git clone https://github.com/maroisa/kms.git
```

### Instalasi packages

```bash
npm install
```

### Database setup

1. Salin `.env.example` menjadi `.env` dan ubah konfigurasi dan pastikan dapat
   terhubung.

```bash
# untuk membuat schema database
npm run db:push 

# ubah DATABASE_URL sesuai dengan .env
# Command ini untuk memberikan dump data yang dibutuhkan
psql DATABASE_URL < mahachicken.sql
```

### Dev

```bash
npm run dev
```

### Build Production

```bash
npm run build # Untuk build; Lalu
node --env-file=.env build/ # Untuk menjalankan hasil build
```
