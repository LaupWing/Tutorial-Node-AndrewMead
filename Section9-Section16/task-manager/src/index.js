const express = require('express')
require('./db/mongoose.js') // by just requiring the file you ensure that it runs when you start this file
const app = express()
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
const port = process.env.PORT || 3000

const router = new express.Router() // custom routers
router.get('/test', (req,res)=>{
    res.send('This is my custom router')
})


app
    .use(express.json()) // use this to parse incoming data to an Object
    .use(userRouter)
    .use(taskRouter)
    .listen(port,()=>console.log('app listening to port', port))


const bcrypt = require('bcryptjs')
const myFunction = async()=>{
    const password = 'Red19945'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)


    const isMatch = await bcrypt.compare(password, hashedPassword)
    console.log(isMatch )
}
myFunction()