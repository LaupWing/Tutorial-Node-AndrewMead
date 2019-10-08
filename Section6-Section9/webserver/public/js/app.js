// const address = 'Heiloo'


const fetchWeather = (address)=>{
    return fetch(`http://localhost:3000/weather?address=${address}`)
            .then(res=>res.json())
            .then(data=>data)
} 

const form = document.querySelector('form')
form.addEventListener('submit', async (event)=>{
    console.log(event)
    event.preventDefault()
    const input = document.querySelector('input[type="text"]').value
    const infoContainer = document.querySelector('.info')
    const data = await fetchWeather(input)
    if(data.error){
        const newEl = `<p>${data.error}</p>`
        infoContainer.insertAdjacentHTML('beforeend', newEl)
    }else{
        console.log(data)
        const newEl = `<p>${data.location}</p><p>${data.forecast}</p>`
        infoContainer.insertAdjacentHTML('beforeend', newEl)
    }
})