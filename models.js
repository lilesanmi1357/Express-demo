const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
    'username':{
        type:String,
        required:true,
    },
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
        required: true,
        validate:{
            validator: validatePassword,
            message: value => "Password is not valid"
        }
    },
},{timestamps: true})


UserSchema.pre("save",async function(next){
    console.log("INS")
    if(!this.isModified("password")){
        return next()
    }
    console.log('hashing')
    try{
        let hashedPassword = await bcrypt.hash(this.password,10)
        this.password = hashedPassword
        console.log(this.password)
        next()
    }
    catch(e){
console.log("ERROR")
    }
  
})


const User = mongoose.model("User",UserSchema)


module.exports = {User}