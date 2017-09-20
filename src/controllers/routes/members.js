const router = require( 'express' ).Router()
const { renderError } = require( '../utilities/utilities.js' )
const events = require( '../../models/events.js' )
const moment = require('moment');

// router.get('/', (request, response, next) => { 
//   console.log( "request.url:", request.url )
//   response.render( 'pages/landing' )
// })



module.exports = router
