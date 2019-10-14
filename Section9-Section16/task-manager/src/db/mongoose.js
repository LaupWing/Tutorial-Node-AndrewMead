const mongoose = require('mongoose')
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'
const validator = require('validator')

mongoose.connect(`${connectionUrl}/${databaseName}`, {
    useNewUrlParser:true,
    useCreateIndex:true, // true to quickly acces the data we need
    useUnifiedTopology: true
})

const User = mongoose.model('User',{
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age:{
        type: Number
    }
})

const Task = mongoose.model('Task',{
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }  
})

const test = new Task({
    description:'Testing',
    completed: false
})

test.save()
    .then(test=>{
        console.log(test)
    })
    .catch(err=>{
        console.log(err)
    })
// const me = new User({
//     name: 'LaupWing',
//     age: 24
// })
// me.save()
//     .then(me=>{
//         console.log(me)
//     })
//     .catch(err=>{
//         console.log(err)
//     })