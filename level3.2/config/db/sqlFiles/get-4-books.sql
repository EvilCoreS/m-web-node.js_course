SELECT * FROM books LIMIT 4 OFFSET ?
# SELECT * FROM books LIMIT 4 OFFSET ${(Number(page)-1) * 4}