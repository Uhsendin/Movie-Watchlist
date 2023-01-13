let userInput = "";
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-input");
const movieContainer = document.querySelector(".movie-container");
const placeholderText = document.querySelector(".placeholder-text");

document.getElementById("submit-form").addEventListener("submit", function (e) {
  e.preventDefault();
  userInput = searchInput.value;

  fetch(`http://www.omdbapi.com/?apikey=6c1fc3d8&s=${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False") {
        console.log("Unable to find what you’re looking for. Please try another search.");
      } else {
        for (i = 0; i < data.Search.length; i++) {
          let movieId = "";
          movieId = data.Search[i].imdbID;

          fetch(`http://www.omdbapi.com/?apikey=6c1fc3d8&i=${movieId}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              placeholderText.classList.add("hidden");
              movieContainer.innerHTML += renderHtml(
                data.Poster,
                data.Title,
                data.Runtime,
                data.Genre,
                data.Plot,
                data.imdbID
              );


              
            });
        }
      }
    });
});

function renderHtml(img, title, runtime, genre, plot,id) {
  let movieHtml = `
    <div class="movie-item">
    <div class="movie-img"><img src="${img}" alt=""></div>
    <div class="movie-info">
      <h3>${title}</h3>
      <div class="movie-subtext">
        <p>${runtime}</p>
        <p>${genre}</p>
        <button data-imdbid="${id}">Watchlist</button>
      </div>
      <div class="movie-desc">${plot}</div>      
    </div>
    </div>
    <hr>
    `;
  return movieHtml;
}

document.querySelector(".movie-container").addEventListener("click", (e) => {
  const isButton = e.target.nodeName = "BUTTON";
  if(!isButton) {
    return
  }
  const movieId = e.target.dataset.imdbid
  fetch(`http://www.omdbapi.com/?apikey=6c1fc3d8&i=${movieId}`)
  .then((response => response.json()))
  .then((data => {
    window.localStorage.setItem(movieId,JSON.stringify(data))
  }))
  
  
})
