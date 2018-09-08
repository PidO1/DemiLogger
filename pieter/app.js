//NPM packages
console.log('APP.js started');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const  mongoose = require('mongoose');

//local packages
const dosentRoute = require('./api/routes/dosente');
const vakkeRoute = require('./api/routes/subjects');
const studentRoute = require('./api/routes/students');

mongoose.connect('mongodb://localhost:27017/DemiLogger',{ useNewUrlParser: true });
console.log('APP.js net voor middleware');
app.use(morgan('dev'));

//CORS ERROR HANDLING INGEBOU***********
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept, Authorization');
if(req.method === 'OPTIONS')
{
  res.header('Access-Control-Allow-Methods','PUT,POST,PATCH, DELETE,GET');
  return res.status(200).json({});
}
next();
});
//CORS ERROR HANDLING EINDE******************
//routes to handle requests///////
app.use('/dosente',dosentRoute);
app.use('/subjects',vakkeRoute);
app.use('/students',studentRoute);

app.use((req,res,next)=>{
  const error = new Error('not found');
  error.status = 404;
  next(error);


});
app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{ message: error.message}

  });

});
module.exports = app;
// mongod.exe --dbpath /Users/User/mongodata      C:\Program Files\MongoDB\Server\4.0
