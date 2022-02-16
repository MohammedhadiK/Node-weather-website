const request = require('request');

const forecast = (latitude,longitude, callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=e386783ec5de0478cb3b75c68d595f57&query=' + latitude + ',' + longitude +'&units=m'
     
     request ({url, json : true}, (error,{body}={}) =>{
            if (error){
                callback('Unable to connect to weather services', undefined)}

            else if (body.error){
                callback('The coordinates entered are wrong!',undefined)
            }
            else{

                const temperature =  body.current.temperature
                const feelslike = body.current.feelslike
                const description = body.current.weather_descriptions[0]
                const windSpeed = body.current.wind_speed
                const  windDir= body.current.wind_dir
                const Vis = body.current.visibility
                const data = {
                    string : description + '. The temperature is ' + temperature + 'ºC. It feel like ' + feelslike + 'ºC. The windspeed is ' + windSpeed + ' m/s in the ' + windDir + ' direction. The visibility is ' + Vis +' Km.'  
                }
                callback(undefined, data.string)
            }
            }
     
         )}

        
module.exports = forecast











