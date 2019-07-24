'use strict';

const rapidApiKey = '185cf93378mshac80b72e1951906p101c0ajsn94eb1a12e125';
const apiKey = 'AIzaSyByBhHS863v3SY7Bu6FXv0NuAJYir6aN9g';
const searchURL = 'https://www.googleapis.com/books/v1/volumes';
const mediaURL = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup';
   
$(document).ready(function() {
    

   /*let handleSearchCollapse =*/ function collapseSearchBar() {
        console.log(`collapseSearchBar ran`)
        if (x.matches) {
        $(window).scroll(function(event) {
            event.preventDefault();
            /*$('.explorable-title').css("position", "absolute");
            $('.explorable-title').css("opacity", "0");
            $('.search-text').css("position", "absolute");
            $('.search-text').css("opacity", "0");*/
            $('.explorable-title').fadeOut();
            $('.search-text').fadeOut();
            var scrollTop = $(document).scrollTop();
            if (scrollTop + $(document).innerHeight() >= document.scrollHeight) { 
                $('.explorable-title').fadeIn()
$('.search-text').fadeIn();
            }
        })
    }
}
           function restoreSearch() {
               if (x.matches) { 
            
             
            if ($(document.body).scrollTop() == 0 ) {
                $('.explorable-title').fadeIn();
                $('.search-text').fadeIn();
            }
        
            }
        }

    let x = window.matchMedia("(max-width: 700px)")
    collapseSearchBar(x);
    restoreSearch(x)
    x.addListener(collapseSearchBar)
    x.addListener(restoreSearch)
    
    
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
/* <h3>${joinAuthors}</h3>*/
    function displayResults(responseJson, maxResults = 6) {

        console.log(`displayResults ran`);
        console.log(responseJson);
      
        $('#results-list').empty();
        
        if (responseJson.totalItems === 0) {
            $('#results-list').append(
                `<p class="no-results">No books found. Please try your search again.</p>`
            )
        } else {
        
        for (let i = 0; i < responseJson.items.length & i < maxResults; i++) {
         
         let joinAuthors = responseJson.items[i].volumeInfo.authors.join(", ")
         let holdDescription =  `${responseJson.items[i].volumeInfo.description}`
         
         if (typeof responseJson.items[i].volumeInfo.description == "undefined") {
            holdDescription = "This book does not have a description.";
         }
            $('#results-list').append(
        `
        <li class="result-display">
        
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
           let locs = `<div class="center-me-2">`;
           
        for (let j = 0; j < responseJson.results[i].locations.length; j++) { 
               locs += `<div class="center-me"><a href="${responseJson.results[i].locations[j].url}"><img src="${responseJson.results[i].locations[j].icon}" class="media-img" alt="${responseJson.results[i].locations[i].display_name}"></a></div>` 
             };
                locs += `</div>`;
            $('#media-results').append(
                `<li class="result-display">
          <img src="${responseJson.results[i].picture}" class="media-picture" alt="Picture of TV show or movie">
         <div class="media-name-and-source"> <h2 class="media-stuff">${responseJson.results[i].name}</h2>` + locs + `</div></li>`)   

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
            .then(responseJson => displayMediaResults(responseJson))
            .catch(err => {
                $('#js-error-message').text(`Something went wrong: ${err.message}`);
            });
    }

    function watchForm() {
        console.log(`watchForm ran`);
        $('form').submit(event => {
            event.preventDefault();
            let searchTerm = $('#js-search-term').val();
            getMedia(searchTerm);
            getBooks(searchTerm);
        });
    }

    $(watchForm);
});