const request = require('request')


const forecast = (longitude,latitude,callback)=>{
    const url = "https://api.weatherapi.com/v1/current.json?key=188c82b1dc0c4aa98ef52744220712&q="+longitude+","+latitude+"&aqi=no"


    request({ url, json: true }, (error, {body}) => {
        if (error) {
           callback('unable to connect to weather service !',undefined);
        } else if (body.error) {
            callback("missing the input parameter !",undefined)
        } else {
            callback(undefined,'Current temp is ' +body.current.temp_c+ '  and feels like temp is '+body.current.feelslike_c+' and condtion is '+ body.current.condition.text+". The humidity is "+body.current.humidity + "%")
    
        }
    
    })
}

module.exports = forecast