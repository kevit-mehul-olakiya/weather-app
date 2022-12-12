const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { title } = require('process')
const geocode   = require('./utils/geocode')
const forecast = require("./utils/forecast")


const app = express()


const publiceDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../src/templet/views')
const headerPath = path.join(__dirname,'../src/templet/partials')


app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(headerPath)


app.use(express.static(publiceDir))
app.get('/', (req, res) => {
    res.render('index',{
        title:"Weather ",
        name:"Mehul Olakiya"
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title:"About Me ",
        name:"Mehul Olakiya"
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title:"Help ",
        name: "Mehul Olakiya",
        message:"This is help page and it create by me."
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
    return  res.send({
            error: "You must have provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={ }) => {
        if (error) {
            return res.send({ error})
        }
        
       
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
          res.send({
            forecast:forecastData,
            location,
            address:req.query.address
          })
        })
    })
 
    // res.send(
    //     {
    //         forecast: "It 's clean",
    //         location: 'rajkot',
    //         address : req.query.address

    //     })
})

app.get('/help/* ', (req,res)=>{
     res.render('error',{
        title: "404",
        name: "Mehul Olakiya",
        errorMessage : "Help artical not found"
     })
})
app.get('*',(req,res )=>{
 res.render('error',{
    title:"404",
    name: "Mehul Olakiya",
    errorMessage:"Page not found"
 })
})

app.listen(3000, () => {
    console.log("Server runnng on 3000");
})