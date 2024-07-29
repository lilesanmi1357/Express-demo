const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require("./models")

require('dotenv').config()

async function authMiddleware(req,res,next){

if(req.path === "/register" || req.path ==="/register/"){
    next();
    return
}
if(req.path ==="/login" || req.path === "/login/"){
    next();
    return
}


let authHeader = req.headers['authorization']
let token =  authHeader && authHeader.split(' ')[1]
console.log(req.path)

if(!token){
    return res.status(401).json({"message":"Unauthorised user"});
}

else{
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    }
    catch{
        return res.status(403).json({"message":"Unauthorised user"});
    }
    delete decoded.iat
   let user = await User.findOne(decoded)
   if(user===null){
 
    return res.status(403).json({"message":"Unauthorised user"});
   }
   req.user = user
}

next();

}

async function authenticate(email,password){
    let user =  await User.findOne({'email':email})
    if(user===null){
        return {"isValid":false,"message":'User with this email does not exist'}
    }
    let isValid = await bcrypt.compare(password,user.password)
    if(!isValid) return {"isValid":false,"message":'Incorrect password provided'}
    else return {"isValid":true,"user":user}
}


function generateToken(payload){
    return jwt.sign(payload,process.env.JWT_SECRET_KEY)
}


module.exports ={authMiddleware,authenticate,generateToken}