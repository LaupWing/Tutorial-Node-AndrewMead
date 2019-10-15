const express = require('express')
require('./db/mongoose.js') // by just requiring the file you ensure that it runs when you start this file
const app = express()
const User = require('./models/user')
const Task = require('./models/task')
const port = process.env.PORT || 3000


app
    .use(express.json()) // use this to parse incoming data to an Object
    .get('/users', async (req,res)=>{
        try{
            const users = await User.find({})
            res.send(users)
        }
        catch(e){
            res.status(500).send(e)
        }
        // User
        //     .find({})
        //     .then(users=>{
        //         res.send(users)
        //     })
        //     .catch(err=>{
        //         res.status(500).send(err)
        //     })
    })
    .get('/tasks', async (req,res)=>{
        try{
            const tasks = await Task.find({})
            res.send(tasks)
        }
        catch(e){
            res.status(500).send(err)
        }
        // Task
        //     .find({})
        //     .then(tasks=>{
        //         res.send(tasks)
        //     })
        //     .catch(err=>{
        //         res
        //             .status(500)
        //             .send(err)
        //     })
    })
    .get('/users/:id', async (req,res)=>{
        const _id = req.params.id
        try{
            const user = await User.findById(_id)
            if(!user){
                return res.status(404).send()
            }
            res.send(user)
        }
        catch(e){
            res.status(500).send()
        }

        // User
        //     .findById(_id)
        //     .then(user=>{
        //         if(!user){
        //             return res.status(404).send()
        //         }
        //         res.send(user)
        //     })
        //     .catch(e=>{
        //         res.status(500).send()
        //     })
    })
    .get('/tasks/:id', (req,res)=>{
        const _id = req.params.id
        Task
            .findById(_id)
            .then(task=>{
                if(!task){
                    return res.status(404).send()
                }
                res.send(task)
            })
            .catch(e=>{
                res.status(500).send()
            })
    })
    .post('/users', async (req,res)=>{
        const user = new User(req.body)
        try{
            await user.save()
            res.status(201).send(user)
        }
        catch(e){
            res
                .status(400)
                .send(e)
        }
        // user
        //     .save()
        //     .then((user)=>{
        //         res
        //             .status(201)
        //             .send(user)
        //     })
        //     .catch((e)=>{
        //         res
        //         .status(400)
        //         .send(e)
        //     })
    })
    .post('/tasks', async (req,res)=>{
        const task = new Task(req.body)
        try{
            await task.save()
            res.status(201).send(task)
        }   
        catch(e){
            res.status(400).send(e)
        }
        // const task = new Task(req.body)
        // task
        //     .save()
        //     .then(task=>{
        //         res
        //             .status(201)
        //             .send(task)
        //     })
        //     .catch(e=>{
        //         res
        //             .status(400)
        //             .send(e)
        //     })
    })
    .listen(port,()=>console.log('app listening to port', port))