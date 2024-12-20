DO $$ BEGIN
    CREATE TYPE NoteStatus AS ENUM ('To do', 'In progress', 'Completed', 'Expired', 'Deleted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "room"(
    id TEXT PRIMARY KEY,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "note"(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    "noteDescription" TEXT,
    "noteStatus" NoteStatus NOT NULL,
    "dueDate" INTEGER,
    
    "roomId" TEXT,
    CONSTRAINT "roomId" FOREIGN KEY("roomId") REFERENCES room(id)
);


