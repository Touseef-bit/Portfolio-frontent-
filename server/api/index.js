var express = require('express');
var logger = require('morgan');
const cors = require('cors')

var app = express()
const port = process.env.PORT || 3000
const globalErrorHandler = require('../middleware/errorMiddleware')
const emailRoutes = require('../routes/emailRoutes')
const serverless = require('serverless-http');



app.use(logger('dev'));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route

app.get('/',(req,res,next)=>{
  return res.json({
    message:"welcome to beckend",
  })
  next()
})

app.use('/api/v1',emailRoutes)

app.use(globalErrorHandler)

app.listen(port,()=>{
  console.log('Connected to Server')
})