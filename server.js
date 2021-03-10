const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const { User, Data } = require('./System/Objects');

app.use(bodyParser.json());
app.use(cors({
  origin:'http://localhost:4200'
}));
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// connect to mongoDB
const db = "mongodb+srv://admin:test12345@cluster0.glqlk.mongodb.net/node?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => console.log('db connected'))
    .catch((err) => console.log(err));


app.get('/pages/charts/get', (req, res)=>{
  const query = Data.find({}, function(err, obj){
    res.send(obj);
  })
})

var chardata = {};
app.post('/pages/charts/get', (req, res)=>{
  chardata = req.body;
})

app.get('/pages/charts/get/data', (req, res)=>{
  // console.log(chardata);
  res.send(chardata);
})

app.post('/auth/login', async (req, res) => {
  const user = {
    email: req.body.email.toLowerCase(),
    password: req.body.password
  };
  User.find(user, function(err,obj) { 
    if(obj.length != 0){
      res.send({succeeded: true});
    }
    else{
      res.send({succeeded: false});
    }
   });
})

app.get('/auth/logout', (req, res) => {
  res.redirect('/pages');
})

app.get('/data/get', (req, res) => {
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
