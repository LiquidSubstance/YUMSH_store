const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(cors());

app.post("/create_page", (req, res) => {
    const {name, price, description, image} = req.body;
    const src = path.join(__dirname, "../Frontend/HTML_pages/Item_pages/template.html");
    const dst = path.join(__dirname, "../Frontend/HTML_pages/Item_pages/" + name + ".html");
    fs.readFile(src, "utf-8", (err, data) => {
        if (err) {
            console.error(err);
        }
        let updated = data
            .replace("{{NAME}}", name)
            .replace("{{PRICE}}", price)
            .replace("{{DESCRIPTION}}", description);
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
app.listen(3000);
