
CREATE TABLE IF NOT EXISTS Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS Enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Grades (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade DECIMAL(5,2) NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(id) ON DELETE CASCADE
);

INSERT INTO Students (name, email) VALUES
('Іван', 'ivan@email.com'),
('Марія', 'maria@email.com'),
('Олександр', 'alex@email.com'),
('Тетяна', 'tanya@email.com');

INSERT INTO Courses (name, description) VALUES
('SQL Basics', 'Основи SQL. Вивчення базових операцій SQL.'),
('JavaScript для початківців', 'Основи програмування на JavaScript.'),
('Основи веб-розробки', 'Вивчення HTML, CSS і основ JavaScript.');

INSERT INTO Enrollments (student_id, course_id) VALUES
(1, 1),  
(2, 1),  
(3, 2),  
(4, 3),  
(2, 3);  


INSERT INTO Grades (student_id, course_id, grade) VALUES
(1, 1, 90.00),
(2, 1, 85.00),
(3, 2, 78.00),
(4, 3, 92.00),
(2, 3, 88.00);
