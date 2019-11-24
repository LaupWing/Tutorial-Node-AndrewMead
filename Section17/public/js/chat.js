const socket = io()

socket.on('message',(message)=>{
    console.log(message)
})
socket.on('setChat',(message)=>{
    console.log(message)
})


const form = document.querySelector('form#chat')
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    socket.emit('sendingMessage',form.message.value)
})