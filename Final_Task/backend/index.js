const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer');
const path = require('path');
const cors = require('cors');



app.use(cors());
app.use(express.static('./public'));
app.use( bodyParser.json() );

//use of multer package
let storage = multer.diskStorage({
    destination :(req, file, cb)=>{
        cb(null, './public/images')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now()+"_"+file.originalname )
    }
})

let upload = multer({
    storage : storage
});
let uploadHandler = upload.single('file');

app.post('/upload', (req,res)=>{
    uploadHandler(req, res, function(err){
        if(!req.file){
            res.status(400).json({message : "No file!"});
        }else{
            res.status(200).json( {message : "Uploaded to the Server!"})
        }
    })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
} )