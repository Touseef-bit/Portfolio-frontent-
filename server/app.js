var express = require('express');
var logger = require('morgan');

var app = express()
const port = process.env.PORT || 3000
const globalErrorHandler = require('./middleware/errorMiddleware')
const emailRoutes = require('./routes/emailRoutes')



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route

app.route('/',(req,res)=>{
  res.json({
    message:"welcomet to beckend"
  })
})

app.use('/api/v1',emailRoutes)


app.listen(port,()=>{
  console.log('Connected to server')
})

app.use(globalErrorHandler)