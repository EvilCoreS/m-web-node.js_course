/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: admin
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `admin` (
  `login` text NOT NULL,
  `pass` text NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: authors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `authors` (`id` int NOT NULL, `author` text NOT NULL) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books` (
  `id` int DEFAULT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `year` int NOT NULL,
  `pages` int NOT NULL,
  `isbn` int NOT NULL,
  `clicks` int NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `isbusy` tinyint(1) NOT NULL DEFAULT '0',
  `toDelete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books_authors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books_authors` (
  `booksID` int NOT NULL,
  `authorID` int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: admin
# ------------------------------------------------------------

INSERT INTO
  `admin` (`login`, `pass`)
VALUES
  ('1', '1');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: authors
# ------------------------------------------------------------

INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (1, 'Андрей Богуславский');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (2, 'Марк Саммерфильд');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (3, 'М., Вильямс');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (4, 'Уэс Маккинни');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (5, 'Брюс Эккель');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (6, 'Томас Кормен');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (7, 'Дэвид Флэнаган');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (8, 'Джеймс Р. Грофф');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (9, 'Люк Веллинг');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (10, 'Сергей Мастицкий');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books
# ------------------------------------------------------------

INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    1,
    'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА',
    'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    2,
    'Программирование на языке Go!',
    'Программирование на языке Go!',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    3,
    'Толковый словарь сетевых терминов и аббревиатур',
    'Толковый словарь сетевых терминов и аббревиатур',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    4,
    'Python for Data Analysis',
    'Python for Data Analysis',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    5,
    'Thinking in Java (4th Edition)',
    'Thinking in Java (4th Edition)',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    6,
    'Introduction to Algorithms',
    'Introduction to Algorithms',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    7,
    'JavaScript Pocket Reference',
    'JavaScript Pocket Reference',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    8,
    'SQL: The Complete Referenc',
    'SQL: The Complete Referenc',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    9,
    'PHP and MySQL Web Development',
    'PHP and MySQL Web Development',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );
INSERT INTO
  `books` (
    `id`,
    `name`,
    `description`,
    `year`,
    `pages`,
    `isbn`,
    `clicks`,
    `views`,
    `isbusy`,
    `toDelete`
  )
VALUES
  (
    10,
    'Статистический анализ и визуализация данных с помощью R',
    'Статистический анализ и визуализация данных с помощью R',
    2022,
    150,
    123456789,
    0,
    0,
    0,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books_authors
# ------------------------------------------------------------

INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (1, 1);
INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (2, 2);
INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (3, 3);
INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (4, 4);
INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (5, 5);
INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (6, 6);
INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (7, 7);
INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (8, 8);
INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (9, 9);
INSERT INTO
  `books_authors` (`booksID`, `authorID`)
VALUES
  (10, 10);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
