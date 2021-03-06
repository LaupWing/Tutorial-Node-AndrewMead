const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelEmail} = require('../emails/account')


const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png)$/)){
            return cb(new Error('Please upload a proper image file'))
        }
        cb(undefined, true)
    }
})

router
    .get('/users/me', auth, async (req,res)=>{
        res.send(req.user)
    })
    .get('/users/:id/avatar', async (req,res)=>{
        try{
            const user = await User.findById(req.params.id)
            if(!user || !user.avatar){
                throw new Error()
            }

            res.set('Content-Type', 'image/png') // set header 
            res.send(user.avatar)

        }catch(e){
            res.status(404).send()
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
        
        try{
            const token = await user.generateAuthToken()
            await user.save()
            console.log(user)
            sendWelcomeEmail(user.email, user.name)
            res.status(201).send({user,token})
        }
        catch(e){
            console.log(e)
            res
                .status(400)
                .send(e)
        }
    })
    .post('/users/me/avatar', auth, upload.single('avatar'), async (req,res)=>{
        const buffer = await sharp(req.file.buffer)
            .resize({
                width: 250,
                height: 250
            })
            .png()
            .toBuffer()

        req.user.avatar = buffer
        await req.user.save()
        res.send()
    },(error, req, res, next)=>{
        res.status(400).send({
            error: error.message
        })
    })
    .post('/users/logout', auth, async (req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(token=>token.token!==req.token)
            await req.user.save()
            res.send()
        }
        catch(e){
            console.log(e)
            res.status(500).send(e)
        }
    })
    .post('/users/logoutAll', auth, async (req,res)=>{
        try{
            req.user.tokens = []
            await req.user.save()
            res.send()
        }
        catch(e){
            console.log(e)
            res.status(500).send(e)
        }
    })
    .patch('/users/me', auth, async (req,res)=>{

        // Check if you can change the property you want to change
        const updates = Object.keys(req.body)
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
            // const user = await User.findById(req.user._id)
            // CODE ABOVE IS NO MORE NEEDE BECUASE THE USER IS SAVED IN THE REQ.BODY
            const user = req.user
            updates.forEach(update=>user[update] = req.body[update])
            await user.save()
            res.send(user)
        }catch(e){
            res.status(404).send(e)
        }
    })
    .delete('/users/me', auth, async (req,res)=>{
        try{
            // const user = await User.findByIdAndDelete(req.user._id)
            // if(!user){
            //     return res.status(404).send()
            // }
            sendCancelEmail(req.user.email, req.user.name)
            await req.user.remove() // is the same as above but nicer
            res.send(req.user)
        }catch(e){
            res.status(500).send()
        }
    })
    .delete('/users/me/avatar', auth, async (req,res)=>{
        try{
            req.user.avatar = undefined
            req.user.save()
            res.send(req.user)
        }catch(e){
            res.status(500).send()
        }
    })

module.exports = router