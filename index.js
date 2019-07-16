'use strict';

    
const rapidApiKey = '185cf93378mshac80b72e1951906p101c0ajsn94eb1a12e125';
const apiKey = 'AIzaSyByBhHS863v3SY7Bu6FXv0NuAJYir6aN9g';
const searchURL = 'https://www.googleapis.com/books/v1/volumes';
const mediaURL = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup';
let changingWords = new Array('You', 'Game of Thrones', 'Legion'),
currentWord = 0;
$(document).ready(function () {
function handleChangingWords() {
    console.log('`handleChangingWords ran`');
    
    
    $('#js-search-term').val(
       
            `${changingWords[currentWord]}`);
        if( currentWord < changingWords.length ) {
            currentWord++;
        } else {
            currentWord = 0;
        }
        
    }
    
    let changeWords = setInterval(handleChangingWords, 1000);
function handleChangeWords() {
    changeWords;
}
function stopChangingWords() {
    console.log('`stopChangingWords ran`');
    $('.search-box').click(function(event){
        event.preventDefault();
        clearInterval(changeWords);
    });

}
stopChangingWords();





function formatQueryParamsBooks(params) {
    console.log(`formatQueryParams ran`);
    const queryItems = Object.keys(params)
    .map (key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function formatQueryParamsMedia(params) {
    console.log(`formatQueryParams ran`);
    const queryItems = Object.keys(params)
    .map (key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}


function handleBookDescriptionDisplay() {
$('#results-list').on('click', '.show-book',
function(event) {
    event.preventDefault();
    const bookDescription = $('#book-description')
    if (bookDescription.hasClass('hidden')) {
    bookDescription.removeClass('hidden').addClass('not-hidden');
    } else { (bookDescription.removeClass('not-hidden').addClass('hidden'))

    }
})
}



function displayResults(responseJson, maxResults = 5) {
    
    console.log(`displayResults ran`);
    console.log(responseJson);
    $('#results-list').empty();
   

    for (let i = 0; i < responseJson.items.length & i < maxResults; i++){

        $('#results-list').append(
            
        `<li class="result-display">
          <img src="${responseJson.items[i].volumeInfo.imageLinks.thumbnail} alt="The book">
          <h2>${responseJson.items[i].volumeInfo.title} by ${responseJson.items[i].volumeInfo.authors} </h2>
          <div class="hold-buttons">
          <button class="show-book">Book Description</button>
          <button id="myBtn">Open Modal</button>


<div id="myModal" class="modal">

  
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>
          <a href="${responseJson.items[i].saleInfo.buyLink}"><button>Buy this Book</button></a>
          </div>
          <div id="book-description-modal" class="hidden">${responseJson.items[i].volumeInfo.description}</p>
          </li>
          `);
        };
       
      handleBookDescriptionDisplay() 
      $('#search-results').removeClass('hidden');
      
};   


// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal

function openModal() {
// When the user clicks on the button, open the modal 
$('#results-list').on('click', '#myBtn',
function(event) {
    event.preventDefault();
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
})
}
openModal();
function closeModal() {
    var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
$('#results-list').on('click', 'span',
function(event) {
    event.preventDefault();
    var modal = document.getElementById("myModal");
   
  modal.style.display = "none";
})
}
closeModal();

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function displayMediaResults(responseJson) {
    
    console.log(`displayMediaResults ran`);
    console.log(responseJson);
    $('#media-results').empty();
   
    for (let i = 0; i < responseJson.results.length ; i++) {
       $('#media-results').append(   
        `<li class="result-display">
          <img src="${responseJson.results[i].picture} class="media-picture" alt="Poster">
          <h1>${responseJson.results[i].name}</h1>`)
    for   (let j = 0; j < responseJson.results[i].locations.length ; j++)  {  
        $('#media-results').append(  
            `<a href="${responseJson.results[i].locations[j].url}"><img src="${responseJson.results[i].locations[j].icon}" alt="${responseJson.results[i].locations[i].display_name}"></a>
            </li>`

        );
          
        };
     
    } 
     

     
        
      $('#search-results').removeClass('hidden');
    }

function getBooks(searchTerm) {
    
    console.log(`getBooks ran`);
    const params = {
        q: searchTerm,
        
    };
    const queryString = formatQueryParamsBooks(params)
    const url = searchURL + '?' + queryString + '&key=' + apiKey;
    

    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();  
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, /*maxResults*/))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getMedia(searchTerm) {
    
    console.log(`getMedia ran`);
    const countryString = 'us';
    const params = {
        term: searchTerm,
        country: countryString
    };
    const queryString = formatQueryParamsMedia(params)
    const url = mediaURL + '?' + queryString;
    console.log(url);

    const options = {
        headers: new Headers({
          "X-RapidApi-Key": rapidApiKey})
      };

    fetch(url, options)
    .then(response => {
        if (response.ok) {
            return response.json();  
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayMediaResults(responseJson, /*maxResults*/))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
    console.log(`watchForm ran`);
   
$('form').submit (event => {
    event.preventDefault();
    
    const searchTerm = $('#js-search-term').val();
   
    handleChangeWords();
    
    getMedia(searchTerm);
    getBooks(searchTerm); 
    
});
}

$(watchForm);
});