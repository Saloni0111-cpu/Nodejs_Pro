/* What have I done? let's check step wise:
Step 1: Create Get, Post, Put, Delete Method
Step 2: Managing Routes: Create Routes folder and move all methods mentioned above in the categories file created in Routes folder.
Step 3: Data Validation with Joi: created function validateData.
Step 4: Integrating the Database: Connecting with mongodb
step 5: Testing the categories Route: we make our express application to work with mongodb compass.
step 6: Building the student API: We create a new file for the students route and  import it into app.js using app.use
Step 7: Organizing the app: Here I created a new directory named as Model where in all models were transfered
Step 8: Buildinng Courses API: We create a new file for the courses route and  import it into app.js using app.use
*/


const express= require('express')
const mongoose = require('mongoose')
const categories= require('./Routes/categories') //importing  the category routes from another file.
const students = require('./Routes/students')
const courses = require('./Routes/courses')
const { Course } = require('./Models/coursesModels')
//creating an instance of the express server
const app = express()

mongoose.connect('mongodb://127.0.0.1/E_Learning')
.then(() => console.log('Connection is Successful to Database'))
.catch(err => console.log('Couldnot connect to mongodb', err.message))

app.use(express.json()); //Parse  incoming requests with JSON payloads and return responses with JSON payloads
app.use('/api/categories',categories); 
app.use('/api/students',students);
app.use('/api/courses',courses);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));