const express = require('express');

const router = express.Router();

const{Students, validate} = require('../Models/studentModels')

//Get Method: To get a new category
router.get('/', async (req, res) => {
    let students = await Students.find();
    res.send(students);
});

//Post Method: to add a new category
router.post('/', async (req, res) => {
  const { error } = validate(req.body); //This validate data will take the bodies data which we will pass
  if (error) res.status(400).send(error.details[0].message);
  const students = new Students({
    name: req.body.name,
    isEnrolled: req.body.isEnrolled,
    Phone:  req.body.Phone
  });
  await students.save();
  res.send(students);
});

//Put Method: To update any category
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const students = await Students.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isEnrolled: req.body.isEnrolled, Phone: req.body.Phone },
    { new: true }
  );

  if (!students) return res.status(404).send("The Student is not found");

  res.send(students);
});

//Delete Method: To del any category
router.delete('/:id', async (req, res) => {
  const students = await Students.findByIdAndDelete(req.params.id);
  if (!students)
    return res.status(404).send("Student with the given id was Not Found");

  res.send(students);
});

router.get('/:id', async (req, res) => {
  const students = await Students.findById(req.params.id);

  if (!students)
    return res.status(404).send("Student with the given id was Not Found");

  res.send(students);
});



module.exports = router;
