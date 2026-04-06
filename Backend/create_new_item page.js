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
app.listen(3000);