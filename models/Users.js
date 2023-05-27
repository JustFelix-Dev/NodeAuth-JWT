const { default: mongoose } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const authUser = new Schema({
    email:{
        type: String,
        required:[true, 'Please enter an email'],
        unique: true,
        lowercase:true,
        validate: [ isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true, 'Please enter a password!'],
        minlength:[6,'Your password should be equal or more than 6 characters']
    }
})

authUser.pre('save', async function( next ){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt); 
    next();
}) 

const User = mongoose.model('blog', authUser)

module.exports = User;