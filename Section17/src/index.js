const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const {messageObject,
    locationObject} = require('./utils/messages')

app
    .use(express.static(publicPath))


io.on('connection', (socket)=>{
    console.log('New websocket connection')
    const message = 'Welcome to the chat app'
    socket.on('join', ({username,room},cb)=>{
        const {error, user} = addUser({id: socket.id, username,room})
        if(error){
            return cb(error)
        }
        socket.join(user.room)
        socket.emit('message', messageObject('Admin',message))
        socket.broadcast.to(user.room).emit('message', messageObject('Admin',`${user.username} has joined`))
        io.to(user.room).emit('roomData', {
            users:getUsersInRoom(user.room),
            room: user.room
        })
        cb()
    })


    socket.on('sendingMessage',(value, cb)=>{
        const user = getUser(socket.id)
        const filter = new Filter()
        if(filter.isProfane(value)){
            return cb('Profanity is not allowed!')
        }
        // if(value)
        io.to(user.room).emit('message', messageObject(user.username,value))
        cb()
    })

    socket.on('sendLocation',(value,cb)=>{
        const user = getUser(socket.id)

        cb('Location has been shared')
        io.to(user.room).emit('locationMessage', locationObject(user.username,`https://google.com/maps?q=${value.lat},${value.long}`))
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message', messageObject(`${user.username} has left`))
            io.to(user.room).emit('roomData', {
                users:getUsersInRoom(user.room),
                room: user.room
            })
        }
    })
})


server.listen(port,()=>console.log(`Server is listening to port ${port}`))