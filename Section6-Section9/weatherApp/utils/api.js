const request = require('request')

const forecast = (lat, long, callback)=>{
    const url = `https://api.darksky.net/forecast/0bfee81d0d48f12651dd1fc9ef560f04/${lat},${long}?units=si`
    request({url, json:true},(error, {body})=>{
        if(error){
            callback('unable to connect', undefined)
        }else if(body.error){
            callback('cant find location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}


const geocode = (adress, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoibGF1cHdpbmciLCJhIjoiY2sxY2F3NXkyMDJhNTNjbjl6aGhzOGdicyJ9.2YhNrtIiq0F6biulYD9N2g`
    request({url, json:true},(error,{body})=>{
        if(error){
            calback('Unable to connect', undefined)
        }else if(body.features.length === 0){
            callback('Adress not found', undefined)
        }else{
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = { 
    forecast,
    geocode
}