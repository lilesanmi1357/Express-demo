const mongoose = require('mongoose');

// Email regex
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

// Password regex
var passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; 


function validateEmail(email){
    return emailRegex.test(email)
}

function validatePassword(password){
    return passwordRegex.test(password)
}
const UserSchema = new mongoose.Schema({
    'username':String,
    'email': {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate:{
            validator: validateEmail,
            message: value => "Email is not valid"
        }
    },
    'password':{
        type: String,
        unique: true,
        required: true,
        validate:{
            validator: validatePassword,
            message: value => "Password is not valid"
        }
    },
},{timestamps: true})


const User = mongoose.model("User",UserSchema)
module.exports = {User}