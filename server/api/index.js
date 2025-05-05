var express = require('express');
var logger = require('morgan');

var app = express()
const port = process.env.PORT || 3000
const globalErrorHandler = require('../middleware/errorMiddleware')
const emailRoutes = require('../routes/emailRoutes')
const serverless = require('serverless-http');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route

app.get('/',(req,res)=>{
  res.json({
    message:"welcome to beckend"
  })
})

app.use('/api/v1',emailRoutes)

app.use(globalErrorHandler)


module.exports = serverless(app);