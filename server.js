//DEPENDENCIES
//.env vars
require('dotenv').config();
//pull PORT and give default val of 4000
//ASK
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require('express');
const app = express(); // create app obj
const mongoose = require('mongoose');
//imp middleware
const cors = require('cors');
const morgan = require('morgan');

/////DATABASE CONNECTION
//ASK
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

/////MODELS
const WordSchema = new mongoose.Schema({
    word: String
});

const Word = mongoose.model('Word', WordSchema);

/////MIDDLEWARE
app.use(cors()); // prevent cors errors, open access to all origins
app.use(morgan('dev')); //logging
app.use(express.json()); //parse json bodies

//Connection events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));


/////ROUTES
// Home
app.get('/', (req, res) => {
    res.send('Home page');
});

//Story
app.get('/story', (req, res) => {
    res.send('Story Page')
});

//Create
app.post('/story', (req, res) => {
    res.send('Create Story Page');
});

//Option1
app.get('/story/option1', (req, res) => {
    res.send('This is Where You Go When Choosing Option 1');
});

//Option2
app.get('/story/option2', (req, res) => {
    res.send('This is Where You Go When Choosing Option 2');
});

//Delete
app.delete('/story/:idx', (req, res) => {
    res.send('This will be my delete route');
});

/////LISTENER
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));