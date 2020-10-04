const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid =require('uuid');

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
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }

    notes.push(newNote);
    return notes;
});

app.delete('/api/notes/:id', (req, res) => {
    const id = notes.some(note => note.id === parseInt(req.params.id));

    if (id) {
        res.json(notes.filter(note => note.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: 'No matching id'})
    }
});

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
})

