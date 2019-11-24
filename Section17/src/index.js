const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')

let count = 0
app
    .use(express.static(publicPath))


io.on('connection', (socket)=>{
    console.log('New websocket connection')
    const message = 'Welcome to the chat app'
    socket.emit('message', message)

    socket.on('sendingMessage',(value)=>{
        console.log(value)
        io.emit('setChat', value)
    })
})
server.listen(port,()=>console.log(`Server is listening to port ${port}`))