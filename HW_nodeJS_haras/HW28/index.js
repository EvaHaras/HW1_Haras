const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/students/average-grades', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT s.name AS student_name, AVG(g.grade) AS average_grade
      FROM Students s
      JOIN Grades g ON s.id = g.student_id
      GROUP BY s.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/students/sql-basics', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT s.name AS student_name
      FROM Students s
      JOIN Enrollments e ON s.id = e.student_id
      JOIN Courses c ON e.course_id = c.id
      WHERE c.name = 'SQL Basics'
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/students/top', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT s.name AS student_name, AVG(g.grade) AS average_grade
      FROM Students s
      JOIN Grades g ON s.id = g.student_id
      GROUP BY s.id
      ORDER BY average_grade DESC
      LIMIT 1
    `);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/courses/student-count', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT c.name AS course_name, COUNT(e.student_id) AS student_count
      FROM Courses c
      JOIN Enrollments e ON c.id = e.course_id
      GROUP BY c.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/courses/high-average', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT c.name AS course_name
      FROM Courses c
      JOIN Grades g ON c.id = g.course_id
      GROUP BY c.id
      HAVING AVG(g.grade) > 85
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
