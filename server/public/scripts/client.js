var editing = false;
var bookId = 0;

$(document).ready(function(){
  console.log('jQuery sourced');
  getBooks();

  $('#books').on('click', '.delete', function(){
    console.log('Delete book: '+ $(this).data('book'));
    // $.ajax({
    //   type: 'DELETE', // Similar SELECT or GET
    //   url: '/books/delete/' + id // e.g. /books/delete/53
    // });
  });

  $('#books').on('click', '.edit', function(){
    console.log($(this).data('book'));
    editing = true;
    $('#formTitle').text("You are now editing...");
    bookId = $(this).data('book');
    $('#title').val($(this).data('title'));
    $('#author').val($(this).data('author'));
  });

  $('#bookForm').on('submit', function(event){
    event.preventDefault();
    console.log($('#title').val(), $('#author').val());
    if(editing) {
      editing = false;
      $('#formTitle').text("Add new entry");
      // $.ajax({
      //   type: "PUT", // Similar to POST (data & req.body)
      // });
    } else {
      $.ajax({
        type: "POST",
        url: "/books/add",
        data: {title: $('#title').val(), author:$('#author').val()},
        success: function(response) {
          // Refresh our data
          getBooks();
        }
      });
    }
    $('#title').val('');
    $('#author').val('');
  });
});

function getBooks() {
  $.ajax({
    type: "GET",
    url: "/books",
    success: function(response) {
      console.log(response);
      $('#books').empty();
      for(var i = 0; i < response.length; i++) {
        var book = response[i];
        $('#books').append('<tr></tr>');
        var $el = $('#books').children().last();
        $el.append('<td>' + book.id + '</td>');
        $el.append('<td>' + book.author + '</td>');
        $el.append('<td>' + book.title + '</td>');
        $el.append('<td><button class="delete" data-book="' +
        book.id + '">Delete</button></td>');
        $el.append('<td><button class="edit" data-book="' +
        book.id + '" data-author="' +
        book.author + '" data-title="'+
        book.title +'">Edit</button></td>');
      }
    }
  });
}
