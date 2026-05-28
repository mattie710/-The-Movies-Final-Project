const postListEl = document.querySelector('.film-list');
const id = localStorage.getItem("Film");

async function onSearchChange(event) {
    const id = event.target.value;
    renderFilms(Title);
}


async function renderFilms(Title) {
    const films = await fetch(`https://jsonplaceholder.typicode.com/posts?FilmId=${Title}`);
    const filmsData = await films.json();
    postListEl.innerHTML = filmsData.map(film => filmHTML(film)).join('');
}

function filmHTML(film) {
    return `
        <div class="film">
          <div class="film__title">
            ${Film.Titleitle}
          </div>
          <p class="film__body">
            ${Film.Plot}
          </p>
        </div>
    `
}

renderFilms(Film);