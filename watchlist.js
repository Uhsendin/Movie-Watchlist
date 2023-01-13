const movieContainer = document.querySelector(".movie-container");
const placeholderText = document.querySelector(".placeholder-text");



window.addEventListener("load", function() {
    for(i = 0; i < localStorage.length; i ++) {
        const movieKey = window.localStorage.getItem(localStorage.key(i))
        const movieData = JSON.parse(movieKey)
        console.log(movieData)
        placeholderText.classList.add("hidden");
        movieContainer.innerHTML += renderWatchlistHtml(movieData.Poster, movieData.Title, movieData.Runtime, movieData.Genre, movieData.Plot, movieData.imdbID)
        
        
    }
    
})




// const test = JSON.parse(window.localStorage.getItem("tt0092106"))


function renderWatchlistHtml(img, title, runtime, genre, plot,id) {
    let movieHtml = `
      <div class="movie-item">
      <div class="movie-img"><img src="${img}" alt=""></div>
      <div class="movie-info">
        <h3>${title}</h3>
        <div class="movie-subtext">
          <p>${runtime}</p>
          <p>${genre}</p>
          <button data-imdbid="${id}">Remove</button>
        </div>
        <div class="movie-desc">${plot}</div>      
      </div>
      </div>
      <hr>
      `;
    return movieHtml;
  }

