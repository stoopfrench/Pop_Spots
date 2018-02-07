const express = require('express')
const request = require('request')
const HTTP = require('http')
const HTTPS = require('https')
const fs = require('fs')

var secrets = require('./secrets.js')

const app = express()

app.use(express.static('./public'))

//SERVE INDEX HTML =========================================================================

app.get('/', function(req, res) {

    res.sendFile('./public/html/index.html', { root: './' })
})

// =========================================================================================

//GOOGLE REQUESTS -------------------------------------------------------------------------------

var googleKey = secrets.googleKey

app.get('/search', function(req, res) {

    // console.log(req.query)

    var googlePlaceApi = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query.query}&key=${googleKey}`

    request(googlePlaceApi, function(err, response, googleDataFromServer) {

        console.log('google place location search ERROR ', err)

        // console.log(response)

        // console.log(googleDataFromServer)

        res.send(googleDataFromServer)

        console.log('googlePlaceApi sent data')
    })
})

app.get('/place', function(req, res) {

    // console.log(req.query)

    var googlePlaceSearchApi = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query.query}&location=${req.query.location}&key=${googleKey}`

    request(googlePlaceSearchApi, function(err, response, googlePlaceSearchDataFromServer) {

        console.log('google place details search ERROR ', err)

        // console.log(response)

        // console.log(googlePlaceSearchDataFromServer)

        res.send(googlePlaceSearchDataFromServer)

        console.log('googlePlaceSearch sent data')
    })
})

app.get('/parking', function(req, res) {

    // console.log(req.query)

    var googleNearBySearchApi = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.location}&radius=800&type=parking&key=${googleKey}`

    request(googleNearBySearchApi, function(err, response, googleNearByDataFromServer) {

        console.log('google parking search ERROR ', err)

        // console.log(response)

        // console.log(googleNearByDataFromServer)

        res.send(googleNearByDataFromServer)

        console.log('googleNearBySearchApi sent data')
    })
})

app.get('/distance', function(req, res) {

    // console.log('distance matrix ', req.query)

    var googleDistanceMatrixApi = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.query.origins}&destinations=place_id:${req.query.destinations}&mode=walking&key=${googleKey}`

    request(googleDistanceMatrixApi, function(err, response, googleDistanceMatrixDataFromServer) {

        console.log('google distance matrix ERROR ', err)

        // console.log(response)

        // console.log(googleDistanceMatrixDataFromServer)

        res.send(googleDistanceMatrixDataFromServer)

        console.log('googleDistanceMatrixAPi sent data')
    })
})

//FACEBOOK REQUESTS -----------------------------------------------------------------------------

var facebook_appID = secrets.facebook_appID
var facebook_appSecret = secrets.facebook_appSecret

app.get('/restaurants', function(req, res) {

    var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=3250&categories=["FOOD_BEVERAGE"]&fields=name,checkins,location,overall_star_rating,rating_count,description,about,website,picture,is_permanently_closed,link,hours,phone,category_list,parking&limit=50&access_token=${facebook_appID}|${facebook_appSecret}`

    request(facebookAPI, function(err, response, restaurantsFromServer) {

        console.log('facebook_restaurants ERROR ', err)

        // console.log(response)

        // console.log(restaurantsFromServer)

        res.send(restaurantsFromServer)

        console.log('facebookAPI sent RESTAURANTS data')
    })
})

app.get('/entertainment', function(req, res) {

    var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=3250&categories=["ARTS_ENTERTAINMENT"]&fields=name,checkins,location,overall_star_rating,rating_count,description,about,website,picture,is_permanently_closed,link,hours,phone,category_list,parking&limit=50&access_token=${facebook_appID}|${facebook_appSecret}`

    request(facebookAPI, function(err, response, entertainmentFromServer) {

        console.log('facebook_entertainment ERROR ', err)

        // console.log(response)

        // console.log(entertainmentFromServer)

        res.send(entertainmentFromServer)

        console.log('facebookAPI sent ENTERTAINMENT data')
    })
})

app.get('/recreation', function(req, res) {

    var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=3250&categories=["FITNESS_RECREATION"]&fields=name,checkins,location,overall_star_rating,rating_count,description,about,website,picture,is_permanently_closed,link,hours,phone,category_list,parking&limit=50&access_token=${facebook_appID}|${facebook_appSecret}`

    request(facebookAPI, function(err, response, recreationFromServer) {

        console.log('facebook_recreation ERROR ', err)

        // console.log(response)

        // console.log(recreationFromServer)

        res.send(recreationFromServer)

        console.log('facebookAPI sent RECREATION data')
    })
})

app.get('/shopping', function(req, res) {


    var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=3250&categories=["SHOPPING_RETAIL"]&fields=name,checkins,location,overall_star_rating,rating_count,description,about,website,picture,is_permanently_closed,link,hours,phone,category_list,parking&limit=50&access_token=${facebook_appID}|${facebook_appSecret}`

    request(facebookAPI, function(err, response, shoppingFromServer) {

        console.log('facebook_shopping ERROR ', err)

        // console.log(response)

        // console.log(shoppingFromServer)

        res.send(shoppingFromServer)

        console.log('facebookAPI sent SHOPPING data')
    })
})


//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-===-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var httpsKey = secrets.httpsKey
var httpsCert = secrets.httpsCert

try {
    var httpsConfig = {

        key: fs.readFileSync(httpsKey),
        cert: fs.readFileSync(httpsCert),
    }

    var httpsServer = HTTPS.createServer(httpsConfig, app)

    httpsServer.listen(443, function() {

        console.log('running on 443')
    })

    var httpApp = express()

    httpApp.use(function(req, res, next) {

        res.redirect('https://pop-spots.co' + req.url)
    })

    httpApp.listen(80)
} catch (e) {

    console.log(e)

    console.log('could not start HTTPS server')

    var httpServer = HTTP.createServer(app)

    daycdhttpServer.listen(80)
}

// var port = 8083

// app.listen(port, function(){

//     console.log("'HotSpots' running on port " + port)
// })