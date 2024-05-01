const express = require('express');
const mongoose=require('mongoose');
const router = express.Router();
const{Course, validate} = require('../Models/coursesModels')
const {Category} = require('../Models/categoriesModel')

//Get Method: To get a new category
router.get('/', async (req, res) => {
    let courses = await Course.find();
    res.send(courses);
});

//Post Method: to add a new category
router.post('/', async (req, res) => {
  const { error } = validate(req.body); //This validate data will take the bodies data which we will pass
    if (error) res.status(400).send(error.details[0].message);

    const category= await Category.findById(req.body.categoryId);
    if(!category) return res.status(400).send("Invalid category Id");

    let course = new Course({
        title: req.body.title,
        category:{
            _id: category._id ,
            name: category.name
        },
        creator:req.body.creator,
        rating: req.body.rating
    });
    course = await course.save();
    res.send(course);
});

//Put Method: To update any category
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const category= await Category.findByIdAndUpdate(req.body.categoryId);
    if(!category) return res.status(400).send("Invalid category Id");


    const course = await Course.findByIdAndUpdate(
    req.params.id,
    ({
        title: req.body.title,
        category:{
            _id: category._id ,
            name: category.name
        },
        creator:req.body.creator,
        rating: req.body.rating
    }),
    { new: true }
    );

    if (!course) return res.status(404).send("The Course is not found");

    res.send(course);
});

//Delete Method: To del any category
router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course)
    return res.status(404).send("Course with the given id was Not Found");

    res.send(course);
});

//Get
router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course)
    return res.status(404).send("Course with the given id was Not Found");

    res.send(course);
});



module.exports = router;
