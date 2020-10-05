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
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
// });

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
    let id = parseInt(req.params.id);

    for (let i = 0; i < notes.length; i++){
        if (id === notes[i].id){
            notes.splice(i, 1);
            return notes;
        } else {
            console.log(`No note matching id: ${id}`);
        };
    };
});

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
})

