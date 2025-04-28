const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/available-rooms', async (req, res) => {
  const { date } = req.query;

  try {
    const [rooms] = await pool.execute(`
      SELECT * FROM Rooms 
      WHERE id NOT IN (
        SELECT room_id FROM Bookings 
        WHERE ? BETWEEN check_in AND check_out
      )
    `, [date]);

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/guests', async (req, res) => {
  const { name, email } = req.body;

  try {
    const [result] = await pool.execute(`
      INSERT INTO Guests (name, email) VALUES (?, ?)
    `, [name, email]);

    res.json({ guestId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/bookings', async (req, res) => {
  const { guestId, roomId, checkIn, checkOut, totalPrice } = req.body;

  try {
    const [result] = await pool.execute(`
      INSERT INTO Bookings (guest_id, room_id, check_in, check_out, total_price)
      VALUES (?, ?, ?, ?, ?)
    `, [guestId, roomId, checkIn, checkOut, totalPrice]);

    res.json({ bookingId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/revenue', async (req, res) => {
  const { month, year } = req.query;

  try {
    const [rows] = await pool.execute(`
      SELECT SUM(total_price) AS revenue FROM Bookings
      WHERE MONTH(check_in) = ? AND YEAR(check_in) = ?
    `, [month, year]);

    res.json({ revenue: rows[0].revenue || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
