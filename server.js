const express = require('express');

const ejs = require('ejs');

const fs = require('fs');

const multer = require('multer');

const app = express();

app.set('view engine', 'ejs');

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        var dir = "./uploads";
        if(!fs.existsSync(dir))
        {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

var upload = multer({storage:storage}).array('files', 12);

app.post("/upload", (req, res, next) => {
    upload(req, res, (err) => {
        if(err){
            return res.send("Erro do upload");
        }
        res.send("Upload completo");
    })
});

app.get('/', (req, res) => {
    res.render('index');
    // res.render(__dirname +'/index');
})

app.listen(4000);
