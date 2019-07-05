'use strict';
const apiKey = 'AIzaSyByBhHS863v3SY7Bu6FXv0NuAJYir6aN9g';
const searchURL = 'https://www.googleapis.com/books/v1/volumes';

$(document).ready(function () {

function formatQueryParams(params) {
    console.log(`formatQueryParams ran`);
    const queryItems = Object.keys(params)
    .map (key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

// google.books.load();
//  function initialize() {
    //  console.log(`initialize ran`);
    // var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    //  viewer.load('ISBN:0738531367');
    
//    }
// google.books.setOnLoadCallback(initialize);

function displayResults(responseJson, maxResults) {
    
    console.log(`displayResults ran`);
    console.log(responseJson);
    $('#results-list').empty();
    
    for (let i = 0; i < responseJson.items.length & i < maxResults; i++){
        
        $('#results-list').append(
            `
          <li>
          <p>${responseJson.items[i].volumeInfo.industryIdentifiers[1].identifier}</p>
          <img src="${responseJson.items[i].volumeInfo.imageLinks.thumbnail} alt="The book">
          <h3>${responseJson.items[i].volumeInfo.title}</h3>
          <h2>${responseJson.items[i].volumeInfo.authors}</h2>
          <p>${responseJson.items[i].volumeInfo.description}</p>
          
          <a href="${responseJson.items[i].saleInfo.buyLink}">Buy this Book</a>
          <input type="submit" class="preview-button" id="book-preview" value="Preview This Book">
          </li>`)
        
        };

        
      $('#search-results').removeClass('hidden');
};

function googleBookViewer() {
    console.log(`'googleBookViewer ran'`)
    $('#results-list').on('click', '#book-preview', function(event)  {
        event.preventDefault();
        location.assign("bookViewer.html");
    });
    }




function getBooks(searchTerm, titleName, authorName, subjectName, publisherName, isbnNumber, freeBooks, maxResults = 5) {
    
    console.log(`getBooks ran`);
    const params = {
        q: searchTerm,
        intitle: titleName,
        inauthor: authorName,
        subject: subjectName,
        inpublisher: publisherName,
        isbn: isbnNumber,
        /*filter: freeBooks,*/

        maxResults: maxResults
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString + '&key=' + apiKey;
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();  
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
/*function handleFreeBooks() {
    console.log(`handleFreeBooks ran`);
    if ($('#js-free-only').val() == true) {
        let freeBooks = free-ebooks;
        
    }
}*/
function watchForm() {
    console.log(`watchForm ran`);
$('form').submit (event => {
    event.preventDefault();
    
    /*handleFreeBooks();*/
   
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    const titleName = $('#js-title-name').val();
    const authorName = $('#js-author-name').val();
    const subjectName = $('#js-subject-name').val();
    const publisherName = $('#js-publisher-name').val();
    const isbnNumber = $('#js-isbn-number').val();

   
    
    getBooks(searchTerm, titleName, authorName, subjectName, publisherName, isbnNumber, /*freeBooks,*/ maxResults);
    googleBookViewer();
});
}
$(watchForm);
});