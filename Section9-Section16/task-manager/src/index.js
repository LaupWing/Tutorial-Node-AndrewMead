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
    .listen(port,()=>console.log('app listening to port', port))


// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async ()=>{
//     // const task = await Task.findById('5dadf42bee483416f8ee2fe2')
//     // await task.populate('owner').execPopulate() // populate allows us to populate data from a relationship (its gonna find the user associated with this task)
//     // console.log(task.owner)
//     const user = await User.findById('5dadf404ee483416f8ee2fe0')

//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks) // this is not actually stored in the databse its a virtual data /(just a relationship)
//     // await user.populate('')
// }

// main()



