const express= require('express')
const {Category, validate} = require('../Models/categoriesModel')


const router=express.Router()


//Get Method: To get a new category
router.get('/', async (req, res) => {
    let categories= await Category.find()
    res.send(categories);
});

//Post Method: to add a new category
router.post('/', async (req, res) => {
    const {error} = validate(req.body) //This validate data will take the bodies data which we will pass
    if(error) res.status(400).send(error.details[0].message)
    const category = new Category({
        name: req.body.name
    });
    await category.save();
    res.send(category);
});

//Put Method: To update any category
router.put('/:id', async(req, res) => {

    const {error} = validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new:true})
    

    if(!category) return res.status(404).send('The Category is not found');

    res.send(category);
});

//Delete Method: To del any category
router.delete('/:id', async(req,res)=>{
    const category = await Category.findByIdAndDelete(req.params.id)
    if(!category) return res.status(404). send("Category with the given id was Not Found");

    res.send(category);
});

router.get('/:id', async(req, res) => {
    const category = await Category.findById(req.params.id)

    if(!category) return res.status(404). send("Category with the given id was Not Found");

    res.send(category);
});




module.exports = router;