//NPM packages
<<<<<<< HEAD
console.log('APP.js started');
=======
>>>>>>> Develop
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
<<<<<<< HEAD



//local packages
const dosentRoute = require('./api/routes/dosente');
const vakkeRoute = require('./api/routes/subjects');
const demiRoute = require('./api/routes/Demi');


console.log('APP.js net voor middleware');
app.use(morgan('dev'));

=======
//local packages
const dosentRoute = require('./api/routes/dosente');
const vakkeRoute = require('./api/routes/subjects');

app.use(morgan('dev'));
>>>>>>> Develop
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
<<<<<<< HEAD
app.use('/demi',demiRoute);
=======
>>>>>>> Develop

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
<<<<<<< HEAD
// mongod.exe --dbpath /Users/User/mongodata      C:\Program Files\MongoDB\Server\4.0
=======
>>>>>>> Develop
