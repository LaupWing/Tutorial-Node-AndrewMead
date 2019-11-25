const socket = io()

socket.on('message',(message)=>{
    console.log(message)
})

const messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#message-template').innerHTML
socket.on('setChat',(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate)
    messages.insertAdjacentHTML('beforeend', html)
})


const form = document.querySelector('form#chat')
const locationBtn = document.querySelector('#send-location')
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const input = event.target.elements.message
    const btn = event.target.querySelector('button')
    btn.setAttribute('disabled', 'disabled')

    socket.emit('sendingMessage',form.message.value, (error)=>{
        btn.removeAttribute('disabled')
        input.value = ''
        input.focus()
        if(error){
            console.log(error)
        }
    })
})


locationBtn.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Browser doesnt suppot geolocation')
    }
    locationBtn.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            long: position.coords.longitude,
            lat: position.coords.latitude
        },(error)=>{
            locationBtn.removeAttribute('disabled')
            console.log(error)
        })
    })
})