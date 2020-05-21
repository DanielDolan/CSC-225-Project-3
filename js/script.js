$('#Loading2').hide();
$('#MainTitle').hide();
jQuery(document).ready(function($){

    
    $('#card').hide();
   

    function createBookListItem(book){
        var $li = $('<li>');    
        $li.addClass('list-group-item');    
        $li.html(book.title); 
        $li.data('bookTitle', book.title);
        $li.data('bookId', book.id);
        $li.data('bookAuthor', book.author);
        $li.data('bookYear', book.year);
        $li.data('bookCountry', book.country);
        return $li;
    }


    var request = axios.get('http://csc225.mockable.io/books'); //this request gets the first page of book titles, before targeting a specific id
    request.then(function(response){ 
        response.data.forEach(function(book){
            $('#Loading').hide();
            $('#MainTitle').show();
            $('#book-list').append(createBookListItem(book));
           
        });


        $('.list-group-item').on('click', function(){
            
            $('#Loading2').show();
            $('.list-group-item').removeClass('current');
            $(this).addClass('current');
            
            $('#card').show();

            $('.list-group-item').removeClass('current');
            var bookId = $(this).data('bookId');
            var $title = $(this).data('bookTitle');
            var $author = $(this).data('bookAuthor');

            $(this).addClass('current');
            $('#bookInfo').html('Loading...');

            var request2 = axios.get('http://csc225.mockable.io/books/' + bookId); //this request targets a specific id based on user click
            request2.then(function(response){

                    $('#Loading2').show();


                    var year = response.data.year; //must use defined variables from API
                    var pages = response.data.pages;
                    var country = response.data.country;
                    var language = response.data.language;

                    console.log(response.data.cover);
                    console.log(response.data.author);
                    console.log(response.data.title);
                    console.log(response.data.year);
                    console.log(response.data.pages);
                    console.log(response.data.country);

                    $('#Loading2').hide();
                    
                    var $img = $('<img>').attr('src', response.data.cover).attr('alt', response.data.title);
                    $('#bookImg').html($img);
                    $('#bookTitle').html('Title: ' +$title);
                    $('#bookAuthor').html('Author: ' + $author);
                    $('#bookYear').html('Year: ' + year);
                    $('#bookPages').html('Pages: ' + pages);
                    $('#bookCountry').html('Country: ' + country);
                    $('#bookLanguage').html('Language: ' + language);

                }
            );
        });
    });

    console.log('Loaded');
});

