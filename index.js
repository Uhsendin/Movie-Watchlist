let userInput = "";
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-input");
const movieContainer = document.querySelector(".movie-container");
const placeholderText = document.querySelector(".placeholder-text");

document.getElementById("submit-form").addEventListener("submit", function (e) {
  e.preventDefault();
  userInput = searchInput.value;
  movieContainer.innerHTML = "";

  fetch(`http://www.omdbapi.com/?apikey=6c1fc3d8&s=${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False") {
        movieContainer.innerHTML = `<p class="error-text">Unable to find what you’re looking <br> for. Please try another search.</p>`;
      } else {
        for (i = 0; i < data.Search.length; i++) {
          let movieId = "";
          movieId = data.Search[i].imdbID;

          fetch(`http://www.omdbapi.com/?apikey=6c1fc3d8&i=${movieId}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              const {Poster,Title,Runtime,Genre,Plot,imdbID,imdbRating,} = data;
              movieContainer.innerHTML += renderHtml(
                Poster,
                Title,
                Runtime,
                Genre,
                Plot,
                imdbID,
                imdbRating
              );
              addToWatchlist()
            });
        }
      }
    });
});

function renderHtml(img, title, runtime, genre, plot, id, rating) {
  let movieHtml = `
    <div class="movie-item">
    <div class="movie-img"><img src="${img}" alt=""></div>
    <div class="movie-info">
      <h3>${title}<i class="fa-solid fa-star"></i><span>${rating}</span></h3>
      <div class="movie-subtext">
        <p>${runtime}</p>
        <p>${genre}</p>
        <button class="add-watchlist-btn" data-imdbid="${id}"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
      </div>
      <div class="movie-desc">${plot}</div>      
    </div>
    </div>
    <hr>
    `;
  return movieHtml;
}

function addToWatchlist() {
  document.querySelectorAll(".add-watchlist-btn").forEach(function (item) {
    item.addEventListener("click", function () {
      const movieId = item.dataset.imdbid;
      fetch(`http://www.omdbapi.com/?apikey=6c1fc3d8&i=${movieId}`)
        .then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem(movieId, JSON.stringify(data));
        });
    });
  });
}
