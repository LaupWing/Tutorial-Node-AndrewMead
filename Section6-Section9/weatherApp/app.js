const {geocode} = require('./utils/api')
const {forecast} = require('./utils/api')

const searchTerm = process.argv[2]
if(searchTerm){
    geocode(searchTerm, (error,{lat,long,location})=>{
        console.log(error)
        if(error){
            return console.log('Error', error)
        }
        forecast(lat, long, (error,forecastData)=>{
            if(error){
                console.log('Error', error)
            }
            console.log(location)
            console.log(forecastData)
        })
    })
}else{
    console.log('Please provice a searchterm')
}
