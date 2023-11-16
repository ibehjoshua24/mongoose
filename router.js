const express = require('express');
const router = express.Router();
const Person = require('./models/person');

// API route to check working hours
router.get('/checkWorkingHours', (req, res) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const hourOfDay = now.getHours();

  // Check if it's a weekday and within working hours
  const isWorkingHours = dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17;

  res.json(isWorkingHours);
});

// API route to create a person record
router.post('/createPerson', async (req, res) => {
  const { name, age, favoriteFoods } = req.body;

  try {
    const newPerson = new Person({
      name,
      age,
      favoriteFoods,
    });

    const savedPerson = await newPerson.save();
    res.json(savedPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving person record' });
  }
});

// API route to create many person records
router.post('/createManyPeople', async (req, res) => {
  const arrayOfPeople = req.body;

  try {
    const createdPeople = await Person.create(arrayOfPeople);
    res.json(createdPeople);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating people records' });
  }
});

module.exports = router;
