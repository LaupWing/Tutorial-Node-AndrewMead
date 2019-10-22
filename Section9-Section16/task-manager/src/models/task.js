const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, // Data store owner is objectid
        required: true,
        ref: 'User' // set up the relationship between task and user
    }  
},{
    timestamps:true
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task