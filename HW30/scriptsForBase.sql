CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    grade DECIMAL(3,1),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(student_id, course_id)
);

INSERT INTO students (full_name, email) VALUES
('Анна Коваль', 'anna.koval@example.com'),
('Ігор Сидоренко', 'ihor.sydorenko@example.com'),
('Марія Петренко', 'maria.petrenko@example.com');

INSERT INTO courses (title, description) VALUES
('SQL Basics', 'Основи SQL для початківців'),
('Web Development', 'HTML, CSS, JS та фреймворки'),
('Data Analysis', 'Початковий курс з аналізу даних');



INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES
(1, 1, CURDATE(), 92.0),
(1, 2, CURDATE(), 88.5);


INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES
(2, 1, CURDATE(), 81.0),
(2, 3, CURDATE(), 87.0);


INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES
(3, 2, CURDATE(), 78.0),
(3, 3, CURDATE(), 90.0);

SELECT s.full_name, AVG(e.grade) AS average_grade
FROM students s
JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id;

SELECT s.full_name
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE c.title = 'SQL Basics';

SELECT s.full_name, AVG(e.grade) AS avg_grade
FROM students s
JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id
ORDER BY avg_grade DESC
LIMIT 1;

SELECT c.title, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id;

SELECT c.title, AVG(e.grade) AS avg_grade
FROM courses c
JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id
HAVING AVG(e.grade) > 85;





