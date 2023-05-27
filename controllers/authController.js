// const cookieParser = require('cookie-parser');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');


const handleError=(err)=>{
  console.log(err.message,err.code)
  let errors = { email:'',password:''}

//   duplicate error code
 if(err.code == 11000){
    errors.email = 'that email is already registered!';
    return errors;
 }

//   validation errors
if(err.message.includes('blog validation failed')){
   Object.values(err.errors).forEach(({ properties })=>{
    errors[properties.path] = properties.message;
   })
}
return errors;
}

// JWT
const maxAge = 3*24*60*60;
const createToken=(id)=>{
   return jwt.sign({id},'felix',{
    expiresIn: maxAge
   })
}

const auth_home=( req,res )=>{
    res.render('index', { title:'Home'})
}

const get_signup=( req,res )=>{
   res.render('signup', {title: 'Signup'})
}

const post_signup= async ( req,res )=>{
    const { email, password } = req.body;
  
    try{
        const user = await User.create({ email , password});
        const token = createToken(user._id)
        res.cookie('jwt', token,{ httpOnly:true , maxAge: maxAge *1000})
        res.status(201).json({ user:user._id })
    }
    catch (err){
       const errors =  handleError(err)
    //    console.log(errors)
        res.status(500).json(errors)

       }
    // console.log( email,password)
    // res.send('New SignUp')
}

const get_login=( req,res )=>{
    res.render('login', {title: 'LogIn'})
}

const post_login=( req,res )=>{
  
    res.send('New Login')
}

module.exports = {
    auth_home,get_signup,post_signup,get_login,post_login
}