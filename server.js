const express = require("express");
const path = require("path");
const notesData = require("./db/db.json")

const PORT = 3001;
const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html")
})

app.get("/api/notes", (req, res) => {
    res.json(notesData)
})

app.post("/api/notes", (req, res) => {
    console.log("body", req.body);
    console.log("req.method", req.method);
    res.json("TESTTTT")
})


app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});