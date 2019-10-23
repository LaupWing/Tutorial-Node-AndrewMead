const express = require('express')
const Task = require('../models/task.js')
const router = new express.Router()
const auth = require('../middleware/auth')

router
    .get('/tasks', auth, async (req,res)=>{
        let match = {}
        let sort = { }
        if(req.query.completed){
            match.completed = req.query.completed === 'true' // if the query sttring is equal to 'true' it returns true
        }

        if(req.query.sortBy){
            const pieces = req.query.sortBy.split(':')
            sort[pieces[0]] = pieces[1] === 'desc' ? -1 : 1
        }
        try{
            await req.user.populate({
                path: 'tasks',
                match,// which task trying to match
                options:{
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
                   
            }).execPopulate()

            res.send(req.user.tasks)
            // The below is the same as the above
            // const tasks = await Task.find({owner: req.user._id})
            // res.send(tasks)
        }
        catch(e){
            res.status(500).send(err)
        }
    })
    .get('/tasks/:id',auth, async (req,res)=>{
        const _id = req.params.id

        try{
            // const task = await Task.findById(_id) // We cant use this now because it finds by id only and not owner and id
            const task = await Task.findOne({
                _id, owner: req.user._id
            })

            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        }catch(err){
            res.status(500).send()
        }
    })
    .post('/tasks', auth, async (req,res)=>{
        // const task = new Task(req.body)
        const task = new Task({
            ...req.body, // this is going to copy the properties of the req.body
            owner: req.user._id
        })
        try{
            await task.save()
            res.status(201).send(task)
        }   
        catch(e){
            res.status(400).send(e)
        }
    })
    .patch('/tasks/:id', auth, async (req,res)=>{
        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValid = updates.every(update=>allowedUpdates.includes(update))
        if(!isValid){
            return res.status(400).send({error: 'Invalid Updates!'})
        }
        try{
            // const tasks = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
            const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
            // const task = await Task.findById(req.params.id)
            if(!task){
                return res.status(404).send()
            }
            updates.forEach(update=>task[update] = req.body[update])
            await task.save()
            res.send(task)
        }
        catch(e){
            res.status(404).send(e)
        }
    })
    .delete('./tasks/:id', auth, async (req,res)=>{
        try{
            const task = await Task.findOneAndDelete({_id: req.params.id, owner:req.body.id})
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        }catch(e){
            res.status(500).send()
        }
    })

module.exports = router
