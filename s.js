const express = require("express");
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
var bodyParser = require('body-parser');
var csv = require('csvtojson')
var path = require("path")
var fSchema = require('./model/model');
URL = 'mongodb+srv://Khushi:Khushi@cluster0.6b9gc.mongodb.net/Feedbox?retryWrites=true&w=majority'

var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        callback(null, './public/uploads')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    })
var uploads = multer({ storage: storage })

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Succesfull"))
  .catch((err) => console.log(err));

  app.use('/',function(req, res, next) {
    console.log('hello world');
    next()
  })
  app.set('view engine', 'ejs');
  app.use(express.static(path.resolve(__dirname, 'public')))
  app.get('/', (req, res) => {
    fSchema.find((err, data) => {
      if (err) {
      } else {
        if (data != '') {
          res.render('index', { data: data })
        } else {
          res.render('index', { data: '' })
        }
      }
    })
  })
  var fResponse
  app.post('/', uploads.single('csvFile'), (req, res) => {
    csv()
      .fromFile(req.file.path)
      .then((response) => {
        console.log(response);
        for (var x = 0; x < response; x++) {
          fResponse = parseFloat(response[x].Name)
          response[x].Name = fResponse
          fResponse = parseFloat(response[x].Email)
          response[x].Email = fResponse
        }
        fSchema.insertMany(response, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.redirect('/')
          }
        })
      })
  })

app.listen(8000, () => {
    console.log("Backend server is running at port 8000!");
});


