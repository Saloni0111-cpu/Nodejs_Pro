//2 Packages: mongoose and Joi
const mongoose=require('mongoose');

const Joi = require('joi');

//Schema
const categorySchema = new mongoose.Schema({
    name: {type : String, requires: true, minlength: 3, maxlength: 30}
})

const Category = mongoose.model('Category',categorySchema)

//Validation
function validateData(category){
    const schema = {
        name : Joi.string().min(3).required()

    };
    return Joi.validate(category, schema)
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validate = validateData;