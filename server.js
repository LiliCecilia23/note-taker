const express = require('express');
const fs = require('fs');
const path = require('path');

const notes = require('./Develop/db/db.json');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

app.post('/api/notes', (req, res) => {
    var newNote = req.body;

    notes.push(newNote);
    return res.json(notes);
});

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
})