const express = require("express");
const fs = require("fs");
const path = require("path");
const notesData = require("./db/db.json")

const PORT = 3001;
const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html")
})

app.get("/api/notes", (req, res) => {
    res.json(notesData)
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    const newData = {
        title,
        text
    };

    let jsonData = [];

    fs.promises.readFile(path.join(__dirname, "db", "db.json"), "utf-8")
        .then(fileData => {
            jsonData = JSON.parse(fileData);

            jsonData.push(newData);

            return fs.promises.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(jsonData));
        })
        .then(() => {
            console.log('Data saved successfully.');
            res.status(200).json(jsonData);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Failed to save data.' });
        });
});



app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});