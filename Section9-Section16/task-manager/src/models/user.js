const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Tasks = require('./task')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true, // prevents double creation of one email
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot be password fool! xD')
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

// This is not stored in the database its only for mongoose to make a relationship
userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id:user._id.toString() }, 'nodetutorial')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

// findByIdAndUpdate doesnt work here because mongoose bypasses it so we need to change it > see > routers > users
userSchema.pre('save', async function(next){
    const user = this

    // Looking for modified password this is a build in mongoose feature
    if(user.isModified('password')){    
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Deletes user tasks when user is removed
userSchema.pre('remove', async function(next){
    const user = this
    await Tasks.deleteMany({ owner: user._id })
    next()
})



const User = mongoose.model('User', userSchema)

module.exports = User