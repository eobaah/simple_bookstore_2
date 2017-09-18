require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const events = require('./src/controllers/routes/events')
const morgan = require( 'morgan' );
const session = require( 'express-session' );
const bodyParser = require( 'body-parser' );


app.use( morgan( 'tiny' ) );

app.use(session({
  key: process.env.KEY,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 60000 }
}));

app.set( 'view engine', 'ejs' );
app.set( 'views',__dirname + '/src/views' );
app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )


app.use('/events', events)

app.listen( port, () => {
  console.log(`Your app is available on port ${port}!`);
})
