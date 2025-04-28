CREATE TABLE guests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    type VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guest_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpassword';
INSERT INTO guests (full_name, phone, email) VALUES
('Ірина Бондаренко', '+380931111111', 'iryna@hotel.com'),
('Сергій Литвин', '+380671234567', 'serhiy@hotel.com'),
('Марина Задорожна', '+380503456789', 'maryna@hotel.com');


INSERT INTO rooms (room_number, type, price, capacity) VALUES
('101', 'Single', 800.00, 1),
('102', 'Double', 1200.00, 2),
('103', 'Suite', 1800.00, 3),
('201', 'Double', 1100.00, 2),
('202', 'Single', 750.00, 1),
('203', 'Suite', 2000.00, 4);



INSERT INTO bookings (guest_id, room_id, check_in, check_out, total_price) VALUES
(1, 1, '2025-04-19', '2025-04-21', 1600.00),

(2, 2, '2025-04-18', '2025-04-21', 3600.00),

(3, 6, '2025-04-20', '2025-04-25', 10000.00),

(1, 5, '2025-04-22', '2025-04-23', 750.00);

SELECT *
FROM rooms
WHERE id NOT IN (
    SELECT room_id
    FROM bookings
    WHERE '2025-04-20' BETWEEN check_in AND DATE_SUB(check_out, INTERVAL 1 DAY)
);


INSERT INTO guests (full_name, phone, email)
VALUES ('Олександр Горобець', '+380661112233', 'oleksandr@hotel.com');


INSERT INTO bookings (guest_id, room_id, check_in, check_out, total_price)
VALUES (
    4,
    3,
    '2025-04-26',
    '2025-04-29',
    (SELECT price * DATEDIFF('2025-04-29', '2025-04-26') FROM rooms WHERE id = 3)
);


SELECT SUM(total_price) AS total_income
FROM bookings
WHERE MONTH(check_in) = 4 AND YEAR(check_in) = 2025;

