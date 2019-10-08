const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const hbs = require('hbs')

// Diffrent paths
const publicDir =  path.join(__dirname, '../public')
const viewDir =  path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')


hbs.registerPartials(partialsDir)
app
    .use(express.static(publicDir))
    .set('view engine', 'hbs')
    .set('views', viewDir)
    .get('', (req, res)=>{
        res.render('index',{
            title: 'Hbs',
            name: 'Loc Nguyen'
        })
    })
    .get('/about', (req,res)=>{
        res.render('about', {
            title: 'About Me',
            name: 'Loc Nguyen'
        })
    })
    .get('/products', (req,res)=>{
        if (!req.query.search) {
            return res.send({
                error: 'You must provide a search term'
            })
        }
    
        console.log(req.query.search)
        res.send({
            products: []
        })
    })
    .get('/help/*', (req,res)=>{
        res.render('404', {
            title: '404',
            name: 'Loc Nguyen',
            errorMessage: 'Help article not found.'
        })
    })
    .get('*', (req, res)=>{
        res.render('index',{
            title: '404',
            name: 'Loc Nguyen',
            errorMessage: 'Page not found'
        })
    })
    .listen(port, ()=>console.log(`server is listening to port${port}`))