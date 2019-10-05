const request = require('request')

const forecast = (lat, long, callback)=>{
    const url = `https://api.darksky.net/forecast/0bfee81d0d48f12651dd1fc9ef560f04/${lat},${long}?units=si`
    request({url, json:true},(error, response)=>{
        if(error){
            callback('unable to connect', undefined)
        }else if(response.error){
            callback('cant find location', undefined)
        }else{
            const data = response.body.currently
            callback(undefined,data)
        }
    })
}


const geocode = (adress, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoibGF1cHdpbmciLCJhIjoiY2sxY2F3NXkyMDJhNTNjbjl6aGhzOGdicyJ9.2YhNrtIiq0F6biulYD9N2g`
    request({url, json:true},(error,response)=>{
        if(error){
            calback('Unable to connect', undefined)
        }else if(response.body.features.length === 0){
            callback('Adress not found', undefined)
        }else{
            callback(undefined, response.body.features[0])
        }
    })
}

module.exports = { 
    forecast,
    geocode
}