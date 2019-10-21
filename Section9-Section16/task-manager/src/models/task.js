const mongoose = require('mongoose')

const Task = mongoose.model('Task',{
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
})

module.exports = Task