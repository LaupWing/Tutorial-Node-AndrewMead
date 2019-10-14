const express = require('express')
require('./db/mongoose.js') // by just requiring the file you ensure that it runs when you start this file
const app = express()
const port = process.env.PORT || 3000



app
    .use(express.json()) // use this to parse incoming data to an Object
    .post('/users', (req,res)=>{
        console.log(req.body)
        res.send('test')
    })
    .listen(port,()=>console.log('app listening to port', port))