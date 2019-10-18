const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router
    .get('/users', async (req,res)=>{
        try{
            const users = await User.find({})
            res.send(users)
        }
        catch(e){
            res.status(500).send(e)
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
    .post('/users/login', async (req,res)=>{
        try{
            // You can make your own method on the User object
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({user, token})
        }catch(e){
            res.status(400).send()
        }
    })
    .post('/users', async (req,res)=>{
        const user = new User(req.body)
        console.log(req.body)
        try{
            const token = await user.generateAuthToken()
            console.log(token)
            await user.save()
            res.status(201).send({user,token})
        }
        catch(e){
            console.log(e)
            res
                .status(400)
                .send(e)
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
            // --- Code below doesnt work with the save middle ware in the users.js in models directory ---
            // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
                // In the thrid parameter of the findByIdAndUpdate it is the options parameter
                    // new:true returned the newly updated user with the updates applied
                    // runValidators:true is use the mongoose validator so it will not accept empty strings
            const user = await User.findById(req.params.id)
            updates.forEach(update=>user[update] = req.body[update])
            await user.save()

            
            if(!user){
                return res.status(404).send()
            }
            res.send(user)
        }catch(e){
            res.status(404).send(e)
        }
    })
    .delete('/users/:id', async (req,res)=>{
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

module.exports = router