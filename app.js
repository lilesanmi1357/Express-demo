const express = require('express');
const mongoose  = require('mongoose');
const app = express()
const port = 3000
const {User} = require('./models')

async function startServer(){
    try{
        await mongoose.connect("mongodb://localhost:27017/")
        app.use(express.json())
        
  
        app.get('/',async (req,res)=>{
            res.send('Index')
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