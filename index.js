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
        console.log("Oops, something is wrong trying typing");
      } else {
        for (i = 0; i < data.Search.length; i++) {
          let movieId = "";
          movieId = data.Search[i].imdbID;

          fetch(`http://www.omdbapi.com/?apikey=6c1fc3d8&i=${movieId}`)
            .then((response) => response.json())
            .then((data) => {
              placeholderText.classList.add("hidden");
              movieContainer.innerHTML += renderHtml(
                data.Poster,
                data.Title,
                data.Runtime,
                data.Genre,
                data.Plot
              );
            });
        }
      }
    });
});

function renderHtml(img, title, runtime, genre, plot) {
  let movieHtml = `
    <div class="movie-item">
    <div class="movie-img"><img src="${img}" alt=""></div>
    <div class="movie-info">
      <h3>${title}</h3>
      <div class="movie-subtext">
        <p>${runtime}</p>
        <p>${genre}</p>
        <button>Watchlist</button>
      </div>
      <div class="movie-desc">${plot}</div>      
    </div>
    </div>
    <hr>
    `;
  return movieHtml;
}
