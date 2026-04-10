const sqlite3 = require('sqlite3').verbose();
const catalogue_db = new sqlite3.Database("../Data/catalogue_db.db");
catalogue_db.run(`
    CREATE TABLE IF NOT EXISTS items (
        id          INTEGER PRIMARY KEY,
        name        TEXT,
        price       INTEGER,
        date        TEXT,
        description TEXT,
        type        TEXT,
        image_path  TEXT
    )                   
`);

const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload_item", (req, res) => {
    const { name, price, date, description, type, image_path} = req.body;

    const sql = `
        INSERT INTO items (name, price, date, description, type, image_path)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    catalogue_db.run(sql, [name, price, date, description, type, image_path], function (err) {
        res.json({
            id: this.lastID,
            name,
            price,
            date,
            description,
            type,
            image_path
        });
    });
})

app.get("/upload_item", (req, res) => {
    db.all("SELECT * FROM items ORDER BY id DESC", [], (err, rows) => {
        res.json(rows);
    })
})

app.listen(3000);