const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.post("/create_page", (req, res) => {
    const {name} = req.body;
    const src = path.join(__dirname, "../Frontend/HTML_pages/template.html");
    const dst = path.join(__dirname, "../Frontend/HTML_pages/Item_pages/template_" + name + ".html");
    fs.copyFile(src, dst, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        else {
            res.json({ok: true, new_path: dst});
        }
    });
})
app.listen(3000);