const express = require('express')
require('./db/mongoose.js') // by just requiring the file you ensure that it runs when you start this file
const app = express()
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
const port = process.env.PORT

app
    .use((req,res, next)=>{
        next()
    })
    .use(express.json()) // use this to parse incoming data to an Object
    .use(userRouter)
    .use(taskRouter)

module.exports =app
