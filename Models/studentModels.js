//2 Packages: mongoose and Joi
const mongoose = require('mongoose');
const Joi = require('joi');


//Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, requires: true, minlength: 3, maxlength: 30 },

    isEnrolled:{
        type: Boolean,
        default: false
    },

    Phone:{
        type: String,
        required: true,
        minlength:10,
        maxlength:25
    }
});

const Students = mongoose.model('Students', studentSchema);

//Validation
function validateData(students) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      Phone : Joi.string().min(10).max(50).required(),
      isEnrolled: Joi.boolean()
    };
    return Joi.validate(students, schema);
  }

    exports.Students = Students;
    exports.validate = validateData;