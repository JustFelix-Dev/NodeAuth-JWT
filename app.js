const express  = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// middleware
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// View Engine
app.set('view engine', 'ejs');

// connect to db
const uri = 'mongodb+srv://Felix:Ade@nodejs.i2xjxlr.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri)
.then(()=>{
    console.log('connected to db')
    app.listen(1000,( req,res )=>{
          console.log('-Listening to port 1000');
    })
})
.catch((err)=>{
    console.log(err.message);
})


// routes
app.use(authRoutes)
