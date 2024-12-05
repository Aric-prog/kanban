DO $$ BEGIN
    CREATE TYPE NoteStatus AS ENUM ('To Do', 'In Progress', 'Completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS room(
    id TEXT PRIMARY KEY,
);

CREATE TABLE IF NOT EXISTS account(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    identifier TEXT UNIQUE
    roomId INTEGER,

    CONSTRAINT roomId FOREIGN KEY(roomId) REFERENCES room(id)
);

CREATE TABLE IF NOT EXISTS notes(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    noteDescription TEXT,
    noteStatus NoteStatus NOT NULL,
    dueDate TIMESTAMPTZ,

    accountId INTEGER,
    CONSTRAINT accountId FOREIGN KEY(accountId) REFERENCES account(id)
);


