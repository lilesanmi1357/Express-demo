const express = require('express');
const mongoose  = require('mongoose');
const app = express()
const port = 3000
const {User} = require('./models');
const { authMiddleware, authenticate, generateToken } = require('./auth');
require('dotenv').config()
console.log(process.env)


async function startServer(){
    try{
        await mongoose.connect(process.env.MONGO_DB)
        app.use(express.json())
        app.use(authMiddleware)
  
        app.post('/',async (req,res)=>{
            res.status(200).json({"message":"User is authenticated"})
        })
        app.post('/register',async (req,res)=>{
            user = User(req.body)
            try{ 
                await user.save()
                res.status(200).json({"message":"success"})
            }
            catch(err){
                if(err && err.code == 11000){
                    res.status(400).json({"message":"User with this email exists"})
                    return
                }
                console.log(err.errors)
                res.status(400).json(err.errors)
            }
        })

        app.post('/login',async(req,res)=>{
            const {email,password} = req.body
            let errors = {}
            if(typeof email !== 'string') errors['email'] = "Email is not provided in payload"
            if(typeof password !== 'string') errors['password'] = "Password is not provided in payload"

            if(Object.keys(errors).length>0) return res.status(400).json({"errors":errors})

            let data = await authenticate(email,password)
            console.log(data)
            if(!data.isValid){
                delete data.isValid
                return res.status(400).json({"errors":data})
            }

            token = generateToken({"email":data.user.email})
            return res.status(200).json({"accessToken":token})


        })
        


        app.listen(port,()=>{
            console.log(`Server started on ${port}`)
        })
    
    }
    catch(error){
        console.error(error)
        process.exit(1)
    }



}

startServer()