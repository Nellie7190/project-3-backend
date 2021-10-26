//DEPENDENCIES
//.env vars
require('dotenv').config();
//pull PORT and give default val of 4000
//ASK
const { PORT, MONGODB_URL } = process.env;
const express = require('express');
const app = express(); // create app obj
const mongoose = require('mongoose');
//imp middleware
const cors = require('cors');
const morgan = require('morgan');
const about = require('./about.json')

/////DATABASE CONNECTION
//ASK
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

/////MODELS
const WordSchema = new mongoose.Schema({
    noun: String,
    adjective: String,
    verb: String,
    number: String,
    created: Boolean
});

const Words = mongoose.model('Word', WordSchema);

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
// //Home
// app.get('/', (req, res) => {
//     res.send('Home page');
// });

//About
app.get('/about', (req, res) => {
        res.json(about);
});

//Coding Story
app.get('/story', async (req, res) => {
    try {
        //send all words
        res.json(await Words.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//Fairytale Story
app.get('/fairytale', async (req, res) => {
    try {
        //send all words
        res.json(await Words.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//Scary Story
app.get('/scary', async (req, res) => {
    try {
        //send all words
        res.json(await Words.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//Create
app.post('/story', async (req, res) => {
    try {
        Words.deleteMany({created: true})
        //send all words
        res.json(await Words.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

//Create
app.post('/fairytale', async (req, res) => {
    try {
        Words.deleteMany({created: true})
        //send all words
        res.json(await Words.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

//Create
app.post('/scary', async (req, res) => {
    try {
        Words.deleteMany({created: true})
        //send all words
        res.json(await Words.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

//Delete
app.delete('/story', async (req, res) => {
    try {
        //send all words
        res.json(await Words.deleteMany());
    } catch (error) {
        res.status(400).json(error);
    }
});

//Delete
app.delete('/fairytale', async (req, res) => {
    try {
        //send all words
        res.json(await Words.deleteMany());
    } catch (error) {
        res.status(400).json(error);
    }
});

//Delete
app.delete('/scary', async (req, res) => {
    try {
        //send all words
        res.json(await Words.deleteMany());
    } catch (error) {
        res.status(400).json(error);
    }
});

/////LISTENER
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));