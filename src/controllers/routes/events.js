const router = require( 'express' ).Router()
const { renderError } = require( '../utilities/utilities.js' )
const events = require( '../../models/events.js' )
const moment = require('moment');



router.get('/', (request, response, next) => {
  console.log("is this working?")
  events.getAll()
    .then( events => {
      let date = events[0].event_date
      response.send( moment( date ).format("ddd, hA") )
    })
})

router.get('/:id', (request, response, next) => {
  const id = request.params.id
  events.getOne( id )
    .then( event => {
      response.send( event )
    })
})

router.post('/', (request, response, next) => {
  const event = request.body
  events.create( event )
    .then( event => {
      console.log(event)
      response.send( event )
    })
})

module.exports = router
