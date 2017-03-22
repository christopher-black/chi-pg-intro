# Full Stack using PG

## Checklist
**Server**

- [x] Setup node `npm init`
 - [x] Add modules (express, body-parser, pg, jquery)
 - [x] Folder structure
 - [x] Set up our initial route
- [x] Create database table Postico
- [x] Create our SELECT query Postico
- [x] Create our GET route
- [x] Add `pg` to our GET route

**Client**

- [x] AJAX call to GET our books (print to console)
- [x] Append them to the DOM
- [x] Create our HTML form
- [x] AJAX call to POST the form data

**Server**

- [x] Set up our POST route in node and log data
- [x] Create our `INSERT` query in Postico
- [x] Use `pg` to write the data to the database

**Client**

- [x] Refresh our UI after a book is added


**Stretch**

- [ ] Add publisher and year
- [ ] Clear form on submit
- [ ] Form validation
- [ ] Search for books using `GET` params

**Client**

- [ ] Delete button in HTML
- [ ] Edit form & button
- [ ] DELETE & EDIT AJAX (Peer Challenge)

**Server**

- [ ] DELETE & EDIT pg (Peer Challenge)

## DATABASE
```SQL
CREATE TABLE books(
	id SERIAL PRIMARY KEY,
	title VARCHAR (1000) NOT NULL,
	author VARCHAR (100) NOT NULL
);

INSERT INTO books (title, author) VALUES ('Rogue Lawyer', 'John Grisham');
INSERT INTO books (title, author) VALUES ('Blue', 'Danielle Steel');
INSERT INTO books (title, author) VALUES ('NYPD Red 4', 'James Patterson and Marshall Karp');


SELECT * FROM "books";
```

## SERVER
```JavaScript
var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'chi', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('SELECT * FROM "books";', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});
```

## CLIENT
```JavaScript
function getBookData() {
  $.ajax({
    type: 'GET',
    url: '/books',
    success: function(response) {
      console.log('response', response);
      appendBooks(response);
    }
  });
}

function appendBooks(books) {
  $('#bookShelf').empty();
  for (var i = 0; i < books.length; i++) {
    var currentBook = books[i];
    var $newBook = $('<tr>');
    $newBook.append('<td>' + currentBook.title + '</td>');
    $newBook.append('<td>' + currentBook.author + '</td>');
    $('#bookShelf').append($newBook);
  }
}
```

## HTML
```HTML
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
    </tr>
  </thead>
  <tbody id="bookShelf">
  </tbody>
</table>
```
