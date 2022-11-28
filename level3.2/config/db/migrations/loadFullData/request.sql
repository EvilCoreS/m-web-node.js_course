INSERT INTO admin (login, pass) VALUES ('1', '1');
INSERT INTO books (id, name, description, author, year, pages, isbn, clicks, views, isbusy, toDelete) VALUES
(1, 'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА', 'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА', 'Андрей Богуславский', 2022, 150, 123456789, 0, 0, 0, 0),
(2, 'Программирование на языке Go!', 'Программирование на языке Go!', 'Марк Саммерфильд', 2022, 150, 123456789, 0, 0, 0, 0),
(3, 'Толковый словарь сетевых терминов и аббревиатур', 'Толковый словарь сетевых терминов и аббревиатур', 'М., Вильямс', 2022, 150, 123456789, 0, 0, 0, 0),
(4, 'Python for Data Analysis', 'Python for Data Analysis', 'Уэс Маккинни', 2022, 150, 123456789, 0, 0, 0, 0),
(5, 'Thinking in Java (4th Edition)', 'Thinking in Java (4th Edition)', 'Брюс Эккель', 2022, 150, 123456789, 0, 0, 0, 0),
(6, 'Introduction to Algorithms', 'Introduction to Algorithms', 'Томас Кормен', 2022, 150, 123456789, 0, 0, 0, 0),
(7, 'JavaScript Pocket Reference', 'JavaScript Pocket Reference', 'Дэвид Флэнаган', 2022, 150, 123456789, 0, 0, 0, 0),
(8, 'SQL: The Complete Referenc', 'SQL: The Complete Referenc', 'Джеймс Р. Грофф', 2022, 150, 123456789, 0, 0, 0, 0),
(9, 'PHP and MySQL Web Development', 'PHP and MySQL Web Development', 'Люк Веллинг', 2022, 150, 123456789, 0, 0, 0, 0),
(10, 'Статистический анализ и визуализация данных с помощью R', 'Статистический анализ и визуализация данных с помощью R', 'Сергей Мастицкий', 2022, 150, 123456789, 0, 0, 0, 0);
INSERT INTO books (id, name, description, year, pages, isbn, clicks, views, isbusy, toDelete) VALUES
(1, 'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА', 'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА', 2022, 150, 123456789, 0, 0, 0, 0),
(2, 'Программирование на языке Go!', 'Программирование на языке Go!', 2022, 150, 123456789, 0, 0, 0, 0),
(3, 'Толковый словарь сетевых терминов и аббревиатур', 'Толковый словарь сетевых терминов и аббревиатур', 2022, 150, 123456789, 0, 0, 0, 0),
(4, 'Python for Data Analysis', 'Python for Data Analysis', 2022, 150, 123456789, 0, 0, 0, 0),
(5, 'Thinking in Java (4th Edition)', 'Thinking in Java (4th Edition)', 2022, 150, 123456789, 0, 0, 0, 0),
(6, 'Introduction to Algorithms', 'Introduction to Algorithms', 2022, 150, 123456789, 0, 0, 0, 0),
(7, 'JavaScript Pocket Reference', 'JavaScript Pocket Reference', 2022, 150, 123456789, 0, 0, 0, 0),
(8, 'SQL: The Complete Referenc', 'SQL: The Complete Referenc', 2022, 150, 123456789, 0, 0, 0, 0),
(9, 'PHP and MySQL Web Development', 'PHP and MySQL Web Development', 2022, 150, 123456789, 0, 0, 0, 0),
(10, 'Статистический анализ и визуализация данных с помощью R', 'Статистический анализ и визуализация данных с помощью R', 2022, 150, 123456789, 0, 0, 0, 0);
INSERT INTO authors (id, author) VALUES
(1, 'Андрей Богуславский'),
(2, 'Марк Саммерфильд'),
(3, 'М., Вильямс'),
(4, 'Уэс Маккинни'),
(5, 'Брюс Эккель'),
(6, 'Томас Кормен'),
(7, 'Дэвид Флэнаган'),
(8, 'Джеймс Р. Грофф'),
(9, 'Люк Веллинг'),
(10, 'Сергей Мастицкий');
INSERT INTO books_authors (booksID, authorID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10)