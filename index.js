'use strict';

const rapidApiKey = '185cf93378mshac80b72e1951906p101c0ajsn94eb1a12e125';
const apiKey = 'AIzaSyByBhHS863v3SY7Bu6FXv0NuAJYir6aN9g';
const searchURL = 'https://www.googleapis.com/books/v1/volumes';
const mediaURL = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup';
let changingWords = new Array('You', 'Game of Thrones', 'Legion', 'Handmaid\'s Tale'),
    currentWord = 0;
    
$(document).ready(function() {
    function handleChangingWords() {
        console.log('`handleChangingWords ran`');

        $('#js-search-term').val(
            `${changingWords[currentWord]}`);
        if (currentWord < changingWords.length - 1) {
            currentWord++;
        } else {
            currentWord = 0;
        }
    }

    let changeWords = setInterval(handleChangingWords, 1500);

    function handleChangeWords() {
        changeWords;
    }
    
    function stopChangingWords() {
        console.log('`stopChangingWords ran`');
        $('.search-box').click(function(event) {
            event.preventDefault();
            clearInterval(changeWords);
        });

    }
    stopChangingWords();

    function formatQueryParamsBooks(params) {
        console.log(`formatQueryParams ran`);
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        return queryItems.join('&');
    }

    function formatQueryParamsMedia(params) {
        console.log(`formatQueryParams ran`);
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        return queryItems.join('&');
    }

    function displayResults(responseJson, maxResults = 4) {

        console.log(`displayResults ran`);
        console.log(responseJson);
      
        $('#results-list').empty();
        if (responseJson.totalItems === 0) {
            $('#results-list').append(
                `<p class="no-results">No books found. Please try your search again.</p>`
            )
        } else {
        
        for (let i = 0; i < responseJson.items.length & i < maxResults; i++) {
         let holdAuthors = `${responseJson.items[i].volumeInfo.authors}`
         let joinAuthors = responseJson.items[i].volumeInfo.authors.join(", ")
         let holdDescription =  `${responseJson.items[i].volumeInfo.description}`
         
         if (typeof responseJson.items[i].volumeInfo.description == "undefined") {
            holdDescription = "This book does not have a description.";
         }
            $('#results-list').append(
        `<li class="result-display">
          <a href="${responseJson.items[i].volumeInfo.previewLink}" target='_blank'"><img src="${responseJson.items[i].volumeInfo.imageLinks.thumbnail} alt="Book cover" class="book-cover"></a>
          <h2>${responseJson.items[i].volumeInfo.title}</h2>
          <h3>${joinAuthors}</h3>
           
          <div class="hold-buttons">
          <button id="myBtn-${i}">Book Description</button>
          <div id="myModal-${i}" class="modal">
          <div class="modal-content">
          <span class="close">&times;</span>
          <p>${holdDescription}</p>
          </div>
          </div>
          </div>
          </li>
          `);
        };


        $('#search-results').removeClass('hidden');

    };
}


    // Get the button that opens the modal
    

    // Get the <span> element that closes the modal

    function openModal() {
       
        // When the user clicks on the button, open the modal 
        $('#results-list').on('click', '#myBtn-0',
            function(event) {
                event.preventDefault();
                let modal0 = document.getElementById("myModal-0");
                modal0.style.display = "block";
            })
            $('#results-list').on('click', '#myBtn-1',
            function(event) {
                event.preventDefault();
                let modal1 = document.getElementById("myModal-1");
                modal1.style.display = "block";
            })
            $('#results-list').on('click', '#myBtn-2',
            function(event) {
                event.preventDefault();
                let modal1 = document.getElementById("myModal-2");
                modal1.style.display = "block";
            })
            $('#results-list').on('click', '#myBtn-3',
            function(event) {
                event.preventDefault();
                let modal1 = document.getElementById("myModal-3");
                modal1.style.display = "block";
            })
            $('#results-list').on('click', '#myBtn-4',
            function(event) {
                event.preventDefault();
                let modal1 = document.getElementById("myModal-4");
                modal1.style.display = "block";
            })
    }

    openModal();
   

    function closeModal() {
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        $('#results-list').on('click', 'span',
            function(event) {
                event.preventDefault();
                let modal0 = document.getElementById("myModal-0");
                modal0.style.display = "none";
                let modal1 = document.getElementById("myModal-1");
                modal1.style.display = "none";
                let modal2 = document.getElementById("myModal-2");
                modal2.style.display = "none";
                let modal3 = document.getElementById("myModal-3");
                modal3.style.display = "none";
                let modal4 = document.getElementById("myModal-4");
                modal4.style.display = "none";
            })
    }
    closeModal();

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        let modal0 = document.getElementById("myModal-0");
        if (event.target == modal0) {
            modal0.style.display = "none";
        }
        let modal1 = document.getElementById("myModal-1");
        if (event.target == modal1) {
            modal1.style.display = "none";
        }
        let modal2 = document.getElementById("myModal-2");
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
        let modal3 = document.getElementById("myModal-3");
        if (event.target == modal3) {
            modal3.style.display = "none";
        }
        let modal4 = document.getElementById("myModal-4");
        if (event.target == modal4) {
            modal4.style.display = "none";
        }
    }

    function displayMediaResults(responseJson) {

        console.log(`displayMediaResults ran`);
        console.log(responseJson);
        $('#media-results').empty();
        if (responseJson.results.length === 0) {
            $('#media-results').append(
                `<p class="no-results">No movies or TV shows found. Please try your search again.</p>`
            )
        } else {
        
        for (let i = 0; i < responseJson.results.length; i++) {
            let locs = "";
            for (let j = 0; j < responseJson.results[i].locations.length; j++) {
                locs += `<a href="${responseJson.results[i].locations[j].url}"><img src="${responseJson.results[i].locations[j].icon}" class="media-img" alt="${responseJson.results[i].locations[i].display_name}"></a>`
            };
            $('#media-results').append(
                `<div class="center-me><li class="result-display">
          <img src="${responseJson.results[i].picture}" class="media-picture" alt="Picture of TV show or movie">
          <h2 class="media-stuff">${responseJson.results[i].name}</h2>` + locs + `</li></div>`)   

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
            .then(responseJson => displayResults(responseJson))
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
                "X-RapidApi-Key": rapidApiKey
            })
        };

        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => displayMediaResults(responseJson, /*maxResults*/ ))
            .catch(err => {
                $('#js-error-message').text(`Something went wrong: ${err.message}`);
            });
    }


    function watchForm() {
        console.log(`watchForm ran`);

        $('form').submit(event => {
            event.preventDefault();

            let searchTerm = $('#js-search-term').val();

            handleChangeWords();

            getMedia(searchTerm);
            getBooks(searchTerm);

        });
    }

    $(watchForm);
});