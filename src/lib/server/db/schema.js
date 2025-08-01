import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const mahasiswa = pgTable("mahasiswa", {
	nim: serial("nim").primaryKey(),
	nama: varchar({ length: 64 }).notNull(),
	tempat_lahir: varchar({ length: 16 }).notNull(),
	tanggal_lahir: date().notNull(),
});
