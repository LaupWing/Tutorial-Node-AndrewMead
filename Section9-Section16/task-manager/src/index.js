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
    })
    .get('/tasks', async (req,res)=>{
        try{
            const tasks = await Task.find({})
            res.send(tasks)
        }
        catch(e){
            res.status(500).send(err)
        }
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
    })
    .patch('/users/:id', async (req,res)=>{

        // Check if you can change the property you want to change
        const updates = Ojbect.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValid = updates.every((update)=>allowedUpdates.includes(update))

        if(!isValid){
            return res.status(400).send({error: 'Invalid Updates!'})
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
            // In the thrid parameter of the findByIdAndUpdate it is the options parameter
                // new:true returned the newly updated user with the updates applied
                // runValidators:true is use the mongoose validator so it will not accept empty strings
            if(!user){
                return res.status(404).send()
            }
            res.send(user)
        }catch(e){
            res.status(404).send(e)
        }
    })
    .patch('/users/:id', async (req,res)=>{
        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValid = updates.every(update=>allowedUpdates.includes(update))
        if(!isValid){
            return res.status(400).send({error: 'Invalid Updates!'})
        }
        try{
            const tasks = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
            if(!tasks){
                return res.status(404).send()
            }
            res.send(tasks)
        }
        catch(e){
            res.status(404).send(e)
        }
    })
    .delete('./users/:id', async (req,res)=>{
        try{
            const user = await User.findByIdAndDelete(req.body.id)
            if(!user){
                return res.status(404).send()
            }
            res.send(user)
        }catch(e){
            res.status(500).send()
        }
    })
    .delete('./tasks/:id', async (req,res)=>{
        try{
            const task = await Task.findByIdAndDelete(req.body.id)
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        }catch(e){
            res.status(500).send()
        }
    })
    .listen(port,()=>console.log('app listening to port', port))