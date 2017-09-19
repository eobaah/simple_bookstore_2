const router = require( 'express' ).Router()
const { renderError } = require( '../utilities/utilities.js' )
const events = require( '../../models/events.js' )
const moment = require('moment');

router.get('/', (request, response, next) => {
  events.getAll()
    .then( events => {
      response.send( events )
    })
})

router.get('/:id', (request, response, next) => {
  const id = request.params.id
  events.getOne( id )
    .then( event => {
      response.send( event )
    })
})

router.post('/new', (request, response, next) => {
  const event = request.body
  console.log( "event:", event )
  events.create( event )
    .then( event => {
      response.send( event )
    })
})

router.put('/:id', (request, response, next) => {
  const id = request.params.id
  const event = request.body
  console.log( "event:", event )
  events.edit( id, event )
    .then( event => {
      console.log("edited response: ",event)
      response.send( event )
    })
})

router.delete('/:id', (request, response, next) => {
  const id = request.params.id
  console.log( "id:", id )
  events.remove( id )
    .then( event => {
      console.log(event)
      response.send( event )
    })
})

router.get('/find', (request, response, next) => {
  const query = request.query.input
  events.search( query )
    .then( events => {
      console.log(events)
      response.send( events )
    })
})

module.exports = router
