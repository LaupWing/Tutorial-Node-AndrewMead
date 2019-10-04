const request = require('request')
const url = 'https://api.darksky.net/forecast/0bfee81d0d48f12651dd1fc9ef560f04/37.8267,-122.4233?units=si'
request({url, json:true},(error, response)=>{
    const data = response.body.currently
    console.log(data)
})