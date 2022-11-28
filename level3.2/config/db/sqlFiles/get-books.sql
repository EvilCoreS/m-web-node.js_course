SELECT * FROM books LIMIT ? OFFSET ?
# SELECT * FROM books LIMIT ${count} OFFSET ${(page-1) * count}