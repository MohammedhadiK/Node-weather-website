const request = require('request')

const geocode = (address, callback) => {
    const url ='http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFkaWsxMjMiLCJhIjoiY2t6NWNkNjR5MGtkdDJ2cWZkNHpveGQwNSJ9.eP8UIvbVL0R3Bg-guZbAnw&limit=1';
    

    request ({ url, json:true}, (error,{body} ={}) =>{
        if (error){
            callback(error,undefined);
        } else if (body.features.length == 0){
            callback('The input is not correct!',undefined)
        } else{
            const longitude =body.features[0].center[0] 
            const latitude =body.features[0].center[1]
            const location =body.features[0].place_name
            const data = {
                longitude,
                latitude,
                location
            }
            callback(undefined,data)
        }

    })
}


module.exports = geocode;