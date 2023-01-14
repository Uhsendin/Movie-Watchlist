const movieContainer = document.querySelector(".movie-container");
const placeholderText = document.querySelector(".placeholder-text");

window.addEventListener("load", function () {
  for (i = 0; i < localStorage.length; i++) {
    const movieKey = window.localStorage.getItem(localStorage.key(i));
    const movieData = JSON.parse(movieKey);
    placeholderText.classList.add("hidden");
    movieContainer.innerHTML += renderWatchlistHtml(
      movieData.Poster,
      movieData.Title,
      movieData.Runtime,
      movieData.Genre,
      movieData.Plot,
      movieData.imdbID
    );
    removeMovie()
  }
});

function renderWatchlistHtml(img, title, runtime, genre, plot, id) {
  let movieHtml = `
      <div class="movie-item">
      <div class="movie-img"><img src="${img}" alt=""></div>
      <div class="movie-info">
        <h3>${title}</h3>
        <div class="movie-subtext">
          <p>${runtime}</p>
          <p>${genre}</p>
          <button class="remove-btn" data-imdbid="${id}">Remove</button>
        </div>
        <div class="movie-desc">${plot}</div>      
      </div>
      </div>
      <hr class="line">
      `;
  return movieHtml;
}

function removeMovie() {
  document.querySelectorAll(".remove-btn").forEach(function (item) {
    item.addEventListener("click", function (e) {
      const movieItemContainer = item.parentElement.parentElement.parentElement;
      movieItemContainer.remove();
      const movieId = e.target.dataset.imdbid;
      window.localStorage.removeItem(movieId);
      document.querySelector(".line").remove()

    });
  });
}
