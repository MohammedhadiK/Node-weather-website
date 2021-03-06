const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 4000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views' )
const partialsPath= path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Mohammed Hadi K'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Mohammed Hadi K'
    })
})

app.get('/help',(req,res) =>{
    res.render('help', {
        title : 'Help page',
        name : 'Mohammed Hadi K',
        message : 'I will assist you today'
    })
})

// app.get('/products',(req,res) =>{
//     if (!req.query.search){
//         return res.send({
//             error: 'You must provide a item for search.'
//         })
//     }

//     console.log(req.query.u)
//     res.send({
//         products:[]
//     })
// })

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send(
            {error:"You must provide an address"}
        )
    }


    geocode( req.query.address, (error, {latitude,longitude,location} ={}) =>{
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })



        })
    })

    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 404,
        errorMessage : 'Help article not found',
        name : 'Mohammed Hadi K'
    })
})

app.get('*',(req,res) =>{
    res.render('404', {
        title:404,
        errorMessage : 'Page not found',
        name : 'Mohammed Hadi K'
    })
})



app.listen(port,() => {
    console.log('The server has started on port ' + port)
})



//Comments ????
// app.get('', (req,res) => {
//     res.send('<h1>Hello express!<h1>')
    
// })
//  let us configure what should be done once an url has been accessed.

 
//  the system app.set expects a views directory 
// once the hbs files are located there. and we have set hbs as the view engine