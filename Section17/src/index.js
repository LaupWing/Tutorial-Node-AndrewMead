const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const {messageObject,
    locationObject} = require('./utils/messages')

app
    .use(express.static(publicPath))


io.on('connection', (socket)=>{
    console.log('New websocket connection')
    const message = 'Welcome to the chat app'
    socket.on('join', ({username,room})=>{
        socket.join(room)
        socket.emit('message', messageObject(message))
        socket.broadcast.to(room).emit('message', messageObject(`${username} has joined`))
    })


    socket.on('sendingMessage',(value, cb)=>{
        const filter = new Filter()
        if(filter.isProfane(value)){
            return cb('Profanity is not allowed!')
        }
        // if(value)
        io.to('1').emit('message', messageObject(value))
        cb()
    })

    socket.on('sendLocation',(value,cb)=>{
        cb('Location has been shared')
        io.to('1').emit('locationMessage', locationObject(`https://google.com/maps?q=${value.lat},${value.long}`))
    })

    socket.on('disconnect',()=>{
        io.to('1').emit('message', messageObject('A user has left'))
    })
})


server.listen(port,()=>console.log(`Server is listening to port ${port}`))