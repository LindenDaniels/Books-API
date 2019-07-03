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

function displayResults(responseJson, maxResults) {
    console.log(`displayResults ran`);
    console.log(responseJson);
    $('#results-list').empty();
    
    for (let i = 0; i < responseJson.items.length & i < maxResults; i++){
   
        $('#results-list').append(
          `
          <li><h3>${responseJson.items[i].volumeInfo.title}</h3>
          <p>${responseJson.items[i].volumeInfo.authors}</p>
          <p>${responseJson.items[i].volumeInfo.description}</p>
          <a href="${responseJson.items[i].saleInfo.buyLink}">Buy this Book</a>
          </li>`
        )};
      $('#search-results').removeClass('hidden');
};

function getBooks(searchTerm, maxResults = 5) {
    
    console.log(`getBooks ran`);
    const params = {
        q: searchTerm,
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
function watchForm() {
    console.log(`watchForm ran`);
$('form').submit (event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getBooks(searchTerm, maxResults);
});
}
$(watchForm);
});