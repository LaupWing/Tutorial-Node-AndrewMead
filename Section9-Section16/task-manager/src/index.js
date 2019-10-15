const express = require('express')
require('./db/mongoose.js') // by just requiring the file you ensure that it runs when you start this file
const app = express()
const User = require('./models/user')
const Task = require('./models/task')
const port = process.env.PORT || 3000


app
    .use(express.json()) // use this to parse incoming data to an Object
    .get('/users', (req,res)=>{
        User
            .find({})
            .then(users=>{
                res.send(users)
            })
            .catch(err=>{
                res.status(500).send(err)
            })
    })
    .get('/tasks', (req,res)=>{
        Task
            .find({})
            .then(tasks=>{
                res
                    .status(201)
                    .send(tasks)
            })
            .catch(err=>{
                res
                    .status(500)
                    .send(err)
            })
    })
    .get('/users/:id', (req,res)=>{
        const _id = req.params.id
        User
            .findById(_id)
            .then(user=>{
                if(!user){
                    return res.status(404).send()
                }
                res.send(user)
            })
            .catch(e=>{
                res.status(500).send()
            })
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
    .post('/users', (req,res)=>{
        const user = new User(req.body)
        user
            .save()
            .then((user)=>{
                res
                    .status(201)
                    .send(user)
            })
            .catch((e)=>{
                res
                    .status(400)
                    .send(e)
            })
    })
    .post('/tasks', (req,res)=>{
        const task = new Task(req.body)
        task
            .save()
            .then(task=>{
                res
                    .status(201)
                    .send(task)
            })
            .catch(e=>{
                res
                    .status(400)
                    .send(e)
            })
    })
    .listen(port,()=>console.log('app listening to port', port))