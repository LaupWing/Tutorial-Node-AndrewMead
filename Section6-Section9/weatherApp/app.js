const {geocode} = require('./utils/api')
const {forecast} = require('./utils/api')

const searchTerm = process.argv[2]
if(searchTerm){
    geocode(searchTerm, (error,geoData)=>{
        if(error){
            return console.log('Error', error)
        }
        forecast(geoData.lat, geoData.long, (error,forecastData)=>{
            if(error){
                console.log('Error', error)
            }
            console.log(geoData.location)
            console.log(forecastData)
        })
    })
}else{
    console.log('Please provice a searchterm')
}
