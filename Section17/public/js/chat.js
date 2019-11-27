// Elements
const socket = io()
const messages = document.querySelector('#messages')
const form = document.querySelector('form#chat')
const locationBtn = document.querySelector('#send-location')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true})
const timeFormat = 'HH:mm a'

const autoScroll = ()=>{
    // New message element
    const newMessage = messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle(newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin

    // Visibleheight
    const visibleHeight = messages.offsetHeight

    // Height of messagess container
    const contentHeight = messages.scrollHeight

    // How var have i scrolled
    const scrollOffset = messages.scrollTop + visibleHeight

    if(contentHeight - newMessageHeight <= scrollOffset){
        messages.scrollTop = messages.scrollHeight
    }
}


socket.on('message',(message)=>{
    const html = Mustache.render(messageTemplate,{
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format(timeFormat)
    })
    messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('locationMessage',(location)=>{
    const html = Mustache.render(locationTemplate,{
        username: location.username,
        location: location.url,
        createdAt: moment(location.createdAt).format(timeFormat)
    })
    messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('roomData', ({room,users})=>{
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

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
        })
    })
})


socket.emit('join', {username,room},error=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})