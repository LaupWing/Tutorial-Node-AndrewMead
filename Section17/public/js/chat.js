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


document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Browser doesnt suppot geolocation')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        socket.emit('sendLocation',{
            long: position.coords.longitude,
            lat: position.coords.latitude
        })
    })
})