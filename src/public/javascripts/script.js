console.log( 'script loaded' )

const saveEditsBtn = document.querySelector( '.save-btn' )
const deleteBtn = document.querySelector( '.delete-btn' )
 console.log( saveEditsBtn )
 console.log( deleteBtn )
const host = 'http://localhost:3000/'

const checkStatus = response =>  {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const editFlyer = () => {
  const httpMethod = 'events/edit/'
  const id = Number( document.querySelector( '.update-form' ).getAttribute( 'data-id' ) )
  const title = document.querySelector( '.update-title' ).childNodes[ 3 ].value
  const venue = document.querySelector( '.update-venue' ).childNodes[ 3 ].value
  const eventDate = document.querySelector( '.update-date' ).childNodes[ 3 ].value
  const startTime = document.querySelector( '.update-start' ).childNodes[ 3 ].value
  const price = document.querySelector( '.update-price' ).childNodes[ 3 ].value
  const details = document.querySelector( '.update-details' ).childNodes[ 3 ].value
  const imageURL = document.querySelector( '.update-image_url' ).childNodes[ 3 ].value
  const genre = document.querySelector( '.update-genre' ).childNodes[ 3 ].value
  console.log("id:",id)

  fetch( host + httpMethod + id, {
    method: 'PUT',
    mode: 'cors',
    redirect: `/events/${id}/`,
    headers: new Headers({
      'Accept': 'application/json',
  		'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      title,
      venue,
      eventDate,
      startTime,
      price,
      details,
      imageURL,
      genre
    })
  }).then( checkStatus )
  console.log( "checkstatus:", checkStatus )
    .catch( err => console.log( err ) )
}

saveEditsBtn.addEventListener("click", event => {
  editFlyer()
})
