const mongoose = require('mongoose')
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

mongoose.connect(`${connectionUrl}/${databaseName}`, {
    useNewUrlParser:true,
    useCreateIndex:true, // true to quickly acces the data we need
    useUnifiedTopology: true
})

const User = mongoose.model('User',{
    name: {
        type: String
    },
    age:{
        type: Number
    }
})

const me = new User({
    name: 'LaupWing',
    age: 24
})
me.save()
    .then(me=>{
        console.log(me)
    })
    .catch(err=>{
        console.log(err)
    })