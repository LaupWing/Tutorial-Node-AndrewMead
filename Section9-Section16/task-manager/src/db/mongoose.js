const mongoose = require('mongoose')
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

mongoose.connect(`${connectionUrl}/${databaseName}`, {
    useNewUrlParser:true,
    useCreateIndex:true, // true to quickly acces the data we need
    useUnifiedTopology: true
})


const Task = mongoose.model('Task',{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }  
})
