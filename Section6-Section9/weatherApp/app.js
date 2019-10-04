const request = require('request')
const url = 'https://api.darksky.net/forecast/0bfee81d0d48f12651dd1fc9ef560f04/37.8267,-122.4233?units=si'
request({url:url, json:true},(error, response)=>{
    if(error){
        console.log('unable to connect')
    }else if(response.error){
        console.log('cant find location')
    }else{
        const data = response.body.currently
        console.log(data)
    }
})

const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibGF1cHdpbmciLCJhIjoiY2sxY2F3NXkyMDJhNTNjbjl6aGhzOGdicyJ9.2YhNrtIiq0F6biulYD9N2g'
request({url:geoUrl, json:true},(error, response)=>{
    if(error){
        console.log('unable to connect')
    }else if(response.body.features.length===0){
        console.log('nutting found')
    }else{
        const data = response.body.features[0].center
        const lat = data[1]
        const long = data[0]
        console.log(data)
    }
})