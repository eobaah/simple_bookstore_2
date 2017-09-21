const router = require( 'express' ).Router()
const { renderError } = require( '../utilities/utilities.js' )
const events = require( '../../models/events.js' )
const moment = require('moment');


router.get( '/', ( request, response, next ) => {
  events.getAll()
    .then( partyEvents => {
      response.render( 'pages/events', {partyEvents} )
    })
})

router.post( '/new', ( request, response, next ) => {
  const {
    title,
    venue,
    event_date,
    start_time,
    price,
    details,
    image_url,
    genre } = request.body
  events.create( title, venue, event_date, start_time, price, details, image_url, genre )
    .then( event => {
      response.send( event )
    })
})

router.get( '/events/edit/:id', ( request, response, next ) => {
  const id = request.params.id
  events.getOne( id )
    .then( event => {
      console.log( "edited response: ",event )
      response.render( 'pages/edit', { event } )
    })
})

router.put( '/events/edit/:id', ( request, response, next ) => {
  const id = request.params.id
  const event = request.body
  console.log( "event:", event )
  events.edit( id, event )
    .then( event => {
      console.log( "edited response: ",event )
      response.redirect( `pages/events/${id}` )
    })
})

router.delete( '/:id', ( request, response, next ) => {
  const id = request.params.id
  console.log( "id:", id )
  events.remove( id )
    .then( event => {
      console.log(event)
      response.send( event )
    })
})

router.get( '/find', ( request, response, next ) => {
  const query = request.query.input
  console.log( "query:", query )
  events.search( query )
    .then( queryResults => {
      console.log( queryResults )
      response.send( queryResults )
    })
})

router.get( '/events/:id', ( request, response, next ) => {
  const id = request.params.id
  events.getOne( id )
    .then( event => {
      response.render( 'pages/event', { event }  )
    })
})


module.exports = router
