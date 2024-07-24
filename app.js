const express = require('express');
const mongoose  = require('mongoose');
const app = express()
const port = 3000

async function startServer(){
    try{
        await mongoose.connect("mongodb://localhost:27017/")
    

        app.get('/',(req,res)=>{


            res.send('Index')
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