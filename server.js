require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const path = require('path');
const app = express();
const members = require('./src/controllers/routes/members')
const events = require('./src/controllers/routes/events')
const morgan = require( 'morgan' );
const session = require( 'express-session' );
const bodyParser = require( 'body-parser' );
const ejsLint = require('ejs-lint');

app.set( 'views', path.join( __dirname, '/src/views' ) );
app.set( 'view engine', 'ejs' );
app.use( express.static( __dirname + '/src/public' ) );

app.use( morgan( 'tiny' ) );

app.use(session({
  key: process.env.KEY,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 60000 }
}));

app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )

app.use('/', events)
app.use('/members', members)

app.listen( port, () => {
  console.log(`Your app is available on port ${port}!`);
})
