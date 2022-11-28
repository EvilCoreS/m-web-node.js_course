SELECT * FROM books WHERE description LIKE ? OR name LIKE ?;
SELECT * FROM authors WHERE author LIKE ?;
SELECT booksID FROM books_authors WHERE authorID = ?;
SELECT * FROM books WHERE id = ?;
SELECT authorID FROM books_authors WHERE booksID = ?;
SELECT author FROM authors WHERE id = ?