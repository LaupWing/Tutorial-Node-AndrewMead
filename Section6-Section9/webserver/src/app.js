const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const publicDir =  path.join(__dirname, '../public')
const viewDir =  path.join(__dirname, '../templates')


app
    .use(express.static(publicDir))
    .set('view engine', 'hbs')
    .set('views', viewDir)
    .get('', (req, res)=>{
        res.render('index',{
            title: 'Hbs'
        })
    })

app.listen(port, ()=>console.log(`server is listening to port${port}`))