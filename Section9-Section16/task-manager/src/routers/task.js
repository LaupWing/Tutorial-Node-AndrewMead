const express = require('express')
const Task = require('../models/task.js')
const router = new express.Router()

router
    .get('/tasks', async (req,res)=>{
        try{
            const tasks = await Task.find({})
            res.send(tasks)
        }
        catch(e){
            res.status(500).send(err)
        }
    })
    .get('/tasks/:id', async (req,res)=>{
        const _id = req.params.id
        try{
            const task = await Task.findById(_id)
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        }catch(err){
            res.status(500).send()
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
    .patch('/tasks/:id', async (req,res)=>{
        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValid = updates.every(update=>allowedUpdates.includes(update))
        if(!isValid){
            return res.status(400).send({error: 'Invalid Updates!'})
        }
        try{
            // const tasks = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
            const task = await Task.findById(req.params.id)
            updates.forEach(update=>task[update] = req.body[update])
            await task.save()
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        }
        catch(e){
            res.status(404).send(e)
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

module.exports = router
