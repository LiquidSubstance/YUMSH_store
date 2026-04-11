const express = require('express')
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Front")));
app.use(cors());
const upload = multer({ dest: '../Front/contents/' });

app.post("/create_page", (req, res) => {
    const {name, price, description} = req.body;
    const src = path.join(__dirname, "../Front/HTML_pages/Item_pages/template.html");
    const dst = path.join(__dirname, "../Front/HTML_pages/Item_pages/" + name + ".html");
    fs.readFile(src, "utf-8", (err, data) => {
        if (err) {
            console.error(err);
        }
        let updated = data
            .replace("{{NAME}}", name)
            .replace("{{PRICE}}", price + "₽")
            .replace("{{DESCRIPTION}}", description)
            .replace("../../contents/Placeholder.png", "../../contents/" + name + ".png");
        fs.writeFile(dst, updated, err => {
            if (err) {
                console.error(err);
            }
            res.json({
                ok: true,
                new_path: dst
            })
        })
    })
})
app.post("/upload_item_image", upload.single("file"), (req, res) => {
    const {name} = req.body;
    const src = req.file.path;
    const dst = path.join(__dirname, "../Front/contents/" + name + ".png");
    console.log(dst)
    fs.rename(src, dst, err => {
        if (err) {
            console.error(err);
        }
        res.json({ok: true});
    })
})
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
        image_path  TEXT,
        page_link TEXT
    )                   
`);

app.post("/upload_item", (req, res) => {
    const { name, price, date, description, type, image_path, page_link} = req.body;

    const sql = `
        INSERT INTO items (name, price, date, description, type, image_path, page_link)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    catalogue_db.run(sql, [name, price, date, description, type, image_path, page_link], function (err) {
        res.json({
            id: this.lastID,
            name,
            price,
            date,
            description,
            type,
            image_path,
            page_link,
        });
    });
})

app.get("/upload_item", (req, res) => {
    db.all("SELECT * FROM items ORDER BY id DESC", [], (err, rows) => {
        res.json(rows);
    })
})

app.listen(3000);