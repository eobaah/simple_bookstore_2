const db = require( './db' )

const getAll = () => {
  return db.any( `SELECT * FROM event ORDER BY event_date ASC`, [] )
    .catch( error => {
      console.log( "Select all query: ", error );
    });
}

const getOne = id => {
  return db.oneOrNone( `SELECT * FROM event WHERE id=$1`, [ id ] )
    .catch( error => {
      console.log( "Select all one query: ", error );
    });
}

const create = ( title, venue, event_date, start_time, price, details, image_url, genre ) => {
  return db.query( `
    INSERT INTO event
      ( title, venue, event_date, start_time, price, details, image_url, genre )
    VALUES
      ( $1, $2, $3, $4, $5, $6, $7, $8 )
    RETURNING *`,
    [ title, venue, event_date, start_time, price, details, image_url, genre ]
  )
    .catch( error => {
      console.log( "Create one event: ", error );
    });
}

const edit = ( id, event ) => {
  return db.oneOrNone( `
    UPDATE event
    SET title=$2, venue=$3, event_date=$4, start_time=$5, price=$6, details=$7, image_url=$8, genre=$9
    WHERE id=$1
    RETURNING *`,
    [ id, event.title, event.venue, event.event_date, event.start_time, event.price, event.details, event.image_url, event.genre ] )
    .catch( error => {
      console.log( "Edit events: ", error );
    });
}

const remove =  id  => {
  return db.oneOrNone( ` DELETE FROM event WHERE id=$1
    RETURNING *`, [ id ])
    .catch( error => {
      console.log( "Remove event: ", error );
    });
}

const search = input => {
  input = `%${input}%`
  return db.any( `
    SELECT * FROM event
    WHERE LOWER(title) like LOWER($1)
    OR LOWER(venue) like LOWER($1)
    OR LOWER(price) like LOWER($1)
    OR LOWER(details) like LOWER($1)
    OR LOWER(image_url) like LOWER($1)
    OR LOWER(genre) like LOWER($1)
  `, [ input ] )
    .catch( error => {
      console.log( "Search for event: ", error );
    });
}

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  search,
  edit
}
