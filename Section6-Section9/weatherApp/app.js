const {geocode} = require('./utils/api')
const {forecast} = require('./utils/api')

geocode('Heiloo', (error,data)=>{
    console.log(error)
    console.log(data)
})

forecast(-75.7088, 44.1545, (error,data)=>{
    console.log(error)
    console.log(data)
})
