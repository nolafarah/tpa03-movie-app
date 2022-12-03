const MOVIE_API = "https://api.themoviedb.org/3/discover/movie?api_key=48c4fa3d53758ce00ec8380ca1e916e0&sort_by=popularity.desc&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=48c4fa3d53758ce00ec8380ca1e916e0&query=";

const moviesBody = document.getElementById("movies");
const form = document.getElementById("form");
const search = document.getElementById("search");
const page = document.getElementById("paging");
 
getMoviesFromApi(MOVIE_API, 1);
 
async function getMoviesFromApi(url, page) {
    const res = await fetch(url+page);
    const resData = await res.json();
    showMovies(resData.results);
}
 
async function searchMovie(url) {
    const res = await fetch(url);
    const resData = await res.json();
    showMovies(resData.results);
    page.innerHTML = "";
}
 
function showMovies(movies) {
    moviesBody.innerHTML = "";
 
    movies.forEach((movie) => { 
        const moviesEl = document.createElement("div");
        moviesEl.classList.add("movie");     
        moviesEl.innerHTML = 
        `<img src="${IMG_PATH + movie.poster_path}" class="movie-img"/>
        
        <div class="movies-title">
        <h2>${movie.title}</h2>
        </div>
        
        <div class="movie-overview" >${movie.overview}
        <div class="movie-container">Rating: <span class="">${movie.vote_average}</span></div>
        <div class="movie-container">Number of votes: <span class="crimson-text">${movie.vote_count}</span></div>
        <div class="movie-container">Release Date: <span class="crimson-text">${movie.release_date}</span></div>
        </div>
        `;
        moviesBody.appendChild(moviesEl);
    });
}
 
function nextPage() {
    let elPage = page.innerText;
    let pageNum = Number(elPage);
    getMoviesFromApi(MOVIE_API, pageNum+1);
    page.innerHTML = `
        <a onclick="previousPage();">
        <i class="fa fa-angle-double-left">
        </i>
        </a>
    ${pageNum + 1}
        <a onclick="nextPage();">
        <i class="fa fa-angle-double-right">
        </i>
        </a>
    `;
    scroll(0,0);
}
 
 
function previousPage() {
    let elPage = page.innerText;
    let pageNum = Number(elPage);
    getMoviesFromApi(MOVIE_API, pageNum-1);
    if (pageNum === 2) {
        page.innerHTML = `${pageNum-1}
        <a onclick="nextPage();">
        <i class="fa fa-angle-double-right">
        </i>
        </a>
    `;
    } else {
        page.innerHTML = `
        <a onclick="previousPage();">
        <i class="fa fa-angle-double-left">
        </i>
        </a>
    ${pageNum-1}
        <a onclick="nextPage();">
        <i class="fa fa-angle-double-right">
        </i>
        </a>
    `;
    }
    scroll(0,0);
}
 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
 
    if (searchTerm) {
        searchMovie(SEARCH_API + searchTerm);
        search.value = "";
    }
});