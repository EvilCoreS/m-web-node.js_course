INSERT INTO books (id, name, description, year, pages, isbn, clicks, views, isbusy, toDelete) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0, 0);
INSERT INTO authors (id, author) VALUES (?, ?);
INSERT INTO books_authors (booksID, authorID) VALUES (?, ?)