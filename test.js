const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const {User} = require("./models")


async function hash(){
    pass =  await  bcrypt.hash('hiejceicnm',10)
    const salt = await bcrypt.genSalt()
    layer1 = await bcrypt.hash(pass,salt)
    console.log(pass)
    console.log(layer1)

    console.log(await bcrypt.compare("hiejceicnm",layer1))
}


async function getUser(){

    await mongoose.connect("mongodb://localhost:27017/")
    let users = await User.find().exec()
    console.log(users)
}

getUser()