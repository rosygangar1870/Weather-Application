const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9zeWdhbmdhcjAiLCJhIjoiY2tpcG9maDllMDVzOTJ1bnloY3NtOWQxYSJ9.ilpCvUMGTqCdkcI72oOCuw&limit=1'
    
    //Calling request, passing in the options object as the first argument we are going to set url property
    //i have value in url variable  and from there i will also set up JSON as true making sure the data
    //gets parsed for us 
    //Next we do have to provide second argument a function to run when the request completes
    request({ url, json: true}, (error, { body }) => {
        
        //right here i am going to provide my function 
        //if statement for if things go well or not
        //Now goal here is to create a function that is highly reusable.
        //When someone calls geocode they might want to do something different with our message then
        //log in to the console
        //Maybe the want to save it to the log file on file system or send it to their sysadmin via an email.
        //Those are all things you could do with the message and its upto geocode to be as flexible as possible.
        //So instead of logging out the error we are going to pass it back to the callbak
        //the callback can then choose what to do
        //So i could call geocode five different times and do five diff things with the error message
        if(error) {
            //now we know  callback function will have 2 arguments, we are gonna have error if there is one
            //otherwise we will have data
            //Now in this case we do indeed have an error
            //So we are going to provide the first argument and we are gonna provde undefined as the  value 
            //for the second
            callback('Unable to conncet to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode