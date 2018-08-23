//NPM packages
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//local packages
const dosentRoute = require('./api/routes/dosente');
const vakkeRoute = require('./api/routes/subjects');

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
