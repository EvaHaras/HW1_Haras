const express = require('express');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  group: String,
  marks: [Number],
});

const Student = mongoose.model('Student', studentSchema);

const app = express();
app.use(express.json());

mongoose.connect('mongodb://admin:admin123@localhost:27017/admin?authSource=admin')
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB error:', err));

app.post('/students', async (req, res) => {
    const students = req.body;  // Данные студентов передаются в теле запроса
  
    // Проверим, что данные переданы
    if (!students || !Array.isArray(students)) {
      return res.status(400).json({ message: 'Please provide an array of students' });
    }
  
    try {
      // Добавляем студентов в базу данных
      await Student.insertMany(students);
      res.json({ message: 'Students created successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Error creating students', error: err });
    }
  });
  
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.put('/students/:id/age', async (req, res) => {
  const { id } = req.params;
  const { age } = req.body;

  const student = await Student.findByIdAndUpdate(id, { age }, { new: true });
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.json(student);
});

app.delete('/students', async (req, res) => {
  const result = await Student.deleteMany({ group: 'A-31' });
  res.json({ message: `${result.deletedCount} students removed from group A-31` });
});

app.get('/students/age-above-20', async (req, res) => {
  const students = await Student.find({ age: { $gt: 20 } });
  res.json(students);
});

app.get('/students/marks-above-85', async (req, res) => {
  const students = await Student.find({ marks: { $elemMatch: { $gt: 85 } } });
  res.json(students);
});

app.get('/students/name-starts-with-a', async (req, res) => {
  const students = await Student.find({ name: /^A/ });
  res.json(students);
});

app.get('/students/sort-by-age', async (req, res) => {
  const students = await Student.find().sort({ age: -1 });
  res.json(students);
});

app.get('/students/average-marks', async (req, res) => {
  const students = await Student.aggregate([
    {
      $project: {
        name: 1,
        age: 1,
        group: 1,
        averageMark: { $avg: '$marks' },
      },
    },
  ]);
  res.json(students);
});

app.get('/students/group-count', async (req, res) => {
  const groupCount = await Student.aggregate([
    {
      $group: {
        _id: '$group',
        count: { $sum: 1 },
      },
    },
  ]);
  res.json(groupCount);
});

app.get('/students/overall-average', async (req, res) => {
  const average = await Student.aggregate([
    {
      $unwind: '$marks',
    },
    {
      $group: {
        _id: null,
        totalMarks: { $sum: '$marks' },
        totalStudents: { $sum: 1 },
      },
    },
    {
      $project: {
        overallAverage: { $divide: ['$totalMarks', '$totalStudents'] },
      },
    },
  ]);
  res.json(average);
});

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});
