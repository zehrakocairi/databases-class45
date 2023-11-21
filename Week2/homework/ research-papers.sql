CREATE TABLE authors (
    author_id INT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender VARCHAR(10)
);

ALTER TABLE authors
ADD COLUMN mentor INT,
ADD CONSTRAINT fk_mentor
    FOREIGN KEY (mentor)
    REFERENCES authors(author_id);


CREATE TABLE research_papers (
    paper_id INT PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(255),
    publish_date DATE
);

CREATE TABLE author_paper (
    author_id INT,
    paper_id INT,
    PRIMARY KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
);

INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor)
VALUES
    (1, 'Author 1', 'University A', '1990-01-01', 10, 'Male', NULL),
    (2, 'Author 2', 'University B', '1985-02-15', 8, 'Female', 1),
    (3, 'Author 3', 'University C', '1992-04-20', 12, 'Male', NULL),
    (4, 'Author 4', 'University A', '1988-09-05', 7, 'Female', 1),
    (5, 'Author 5', 'University B', '1995-12-10', 9, 'Male', 3),
    (6, 'Author 6', 'University C', '1983-07-25', 11, 'Female', 2),
    (7, 'Author 7', 'University A', '1980-03-18', 8, 'Male', 3),
    (8, 'Author 8', 'University B', '1987-06-30', 10, 'Female', 1),
    (9, 'Author 9', 'University C', '1998-11-15', 6, 'Male', 2),
    (10, 'Author 10', 'University A', '1993-08-22', 14, 'Female', 4),
    (11, 'Author 11', 'University B', '1986-05-28', 8, 'Male', 5),
    (12, 'Author 12', 'University C', '1981-10-12', 9, 'Female', 4),
    (13, 'Author 13', 'University A', '1996-07-08', 11, 'Male', 5),
    (14, 'Author 14', 'University B', '1984-02-03', 13, 'Female', 6),
    (15, 'Author 15', 'University C', '1989-09-17', 7, 'Male', 6);

INSERT INTO research_papers (paper_id, paper_title, conference, publish_date)
VALUES
    (1, 'Paper 1', 'Conference X', '2022-05-10'),
    (2, 'Paper 2', 'Conference Y', '2022-06-15'),
    (3, 'Paper 3', 'Conference Z', '2022-07-20'),
    (4, 'Paper 4', 'Conference X', '2022-08-05'),
    (5, 'Paper 5', 'Conference Y', '2022-09-12'),
    (6, 'Paper 6', 'Conference Z', '2022-10-18'),
    (7, 'Paper 7', 'Conference X', '2022-11-02'),
    (8, 'Paper 8', 'Conference Y', '2022-12-08'),
    (9, 'Paper 9', 'Conference Z', '2023-01-15'),
    (10, 'Paper 10', 'Conference X', '2023-02-20'),
    (11, 'Paper 11', 'Conference Y', '2023-03-25'),
    (12, 'Paper 12', 'Conference Z', '2023-04-30'),
    (13, 'Paper 13', 'Conference X', '2023-05-06'),
    (14, 'Paper 14', 'Conference Y', '2023-06-12'),
    (15, 'Paper 15', 'Conference Z', '2023-07-18'),
    (16, 'Paper 16', 'Conference X', '2023-08-24'),
    (17, 'Paper 17', 'Conference Y', '2023-09-30'),
    (18, 'Paper 18', 'Conference Z', '2023-10-05'),
    (19, 'Paper 19', 'Conference X', '2023-11-10'),
    (20, 'Paper 20', 'Conference Y', '2023-12-16'),
    (21, 'Paper 21', 'Conference Z', '2023-01-22'),
    (22, 'Paper 22', 'Conference X', '2023-02-28'),
    (23, 'Paper 23', 'Conference Y', '2023-03-05'),
    (24, 'Paper 24', 'Conference Z', '2023-04-11'),
    (25, 'Paper 25', 'Conference X', '2023-05-17'),
    (26, 'Paper 26', 'Conference Y', '2023-06-23'),
    (27, 'Paper 27', 'Conference Z', '2023-07-29'),
    (28, 'Paper 28', 'Conference X', '2023-08-04'),
    (29, 'Paper 29', 'Conference Y', '2023-09-10'),
    (30, 'Paper 30', 'Conference Z', '2023-10-16');
   
INSERT INTO author_paper (author_id, paper_id)
VALUES
    (1, 1), (1, 2), (1, 3),
    (2, 1), (2, 4), (2, 5),
    (3, 2), (3, 3),
    (4, 1), (4, 4),
    (5, 5), (5, 6),
    (6, 7), (6, 8),
    (7, 9), (7, 10),
    (8, 11), (8, 12),
    (9, 13), (9, 14),
    (10, 15), (10, 16),
    (11, 17), (11, 18),
    (12, 19), (12, 20),
    (13, 21), (13, 22),
    (14, 23), (14, 24),
    (15, 25), (15, 26);

-- Print names of all authors and their corresponding mentors.
SELECT authors.author_name, mentors.author_name AS mentor_name FROM authors
LEFT JOIN authors AS mentors ON authors.mentor = mentors.author_id 

-- Print all columns of authors and their published paper titles. If there is an author without any research papers, print the information of that author too.
SELECT authors.*, rp.paper_title FROM authors
LEFT JOIN author_paper ap ON authors. author_id = ap.author_id
LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id

-- All research papers and the number of authors that wrote that paper:
SELECT rp.paper_title, COUNT(ap.author_id) AS num_authors
FROM research_papers AS rp
LEFT JOIN author_paper ap ON rp.paper_id = ap.paper_id
GROUP BY rp.paper_title;

-- Sum of the research papers published by all female authors:
SELECT SUM(rp.paper_id) AS total_papers_by_female
FROM authors
JOIN author_paper ap ON authors.author_id = ap.author_id
JOIN research_papers rp ON ap.paper_id = rp.paper_id
WHERE authors.gender = 'Female';

-- Average of the h-index of all authors per university:
SELECT university, AVG(h_index) AS avg_h_index
FROM authors
GROUP BY university;

-- Sum of the research papers of the authors per university:
SELECT university, COUNT(rp.paper_id) AS total_papers
FROM authors
JOIN author_paper ap ON authors.author_id = ap.author_id
JOIN research_papers rp ON ap.paper_id = rp.paper_id
GROUP BY university;

-- Minimum and maximum of the h-index of all authors per university:
SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
FROM authors
GROUP BY university;

 