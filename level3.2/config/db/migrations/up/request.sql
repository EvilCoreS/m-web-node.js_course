CREATE TABLE IF NOT EXISTS admin
(
    login text not null,
    pass  text not null
);
CREATE TABLE IF NOT EXISTS books(
    id int null,
    name        text         not null,
    description text         not null,
    author      text         not null,
    year        int          not null,
    pages       int          not null,
    isbn        int          not null,
    clicks      int        default 0 not null,
    views       int        default 0 not null,
    isbusy      tinyint(1) default 0 not null,
    toDelete    tinyint(1) default 0 not null
);
CREATE TABLE IF NOT EXISTS books(
    id int null,
    name        text         not null,
    description text         not null,
    year        int          not null,
    pages       int          not null,
    isbn        int          not null,
    clicks      int        default 0 not null,
    views       int        default 0 not null,
    isbusy      tinyint(1) default 0 not null,
    toDelete    tinyint(1) default 0 not null
);
CREATE TABLE IF NOT EXISTS authors
(
    id     int  not null,
    author text not null
);
CREATE TABLE IF NOT EXISTS books_authors
(
    booksID  int not null,
    authorID int not null
)