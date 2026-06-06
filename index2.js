function openMenu() {
    document.body.classList += " menu--open";
}

function closeMenu() {
    document.body.classList.remove('menu--open');
}
document.addEventListener('DOMContentLoaded', () => {
    const FilmListEl = document.querySelector(".film-list");
    let filmsData = [];
    async function main() {
       const Film = await fetch("https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON");
       const FilmData = await Film.json();
       renderFilms();
       FilmListEl.innerHTML = FilmData.map((Film) => FilmHTML(Film)).join("");
    }

    main();

    function showFilm(Film) {
        localStorage.setItem("film-card", JSON.stringify(Film));
        window.location.href = `${window.location.origin}/film.html`
    }

    function FilmHTML(Film){
        return `<div class="film-card" onclick="showFilmPosts(${Film.Title})">
        <div class="film-card__container">
          <h3>${Film.Title}</h3>
             <img src="${Film.Images}" alt="Poster for ${Film.Title}">
             <p><b>Genre:</b> ${Film.Genre}</p>
             <p><b>Cast:</b> ${Film.Actors}</p>
             <p><b>Released:</b> ${Film.Released}</p>
             <p><b>imdbRating:</b> ${Film.imdbRating}</p>
        </div>
       </div>`;
    }
});    

fetch('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON') // Replace with your actual API URL
    .then(response => response.json())
    .then(data => {
        // Assuming the API response has a "Poster" key
        const imageUrl = data.Poster; // Extract the URL from the poster key
        document.getElementById('moviePoster').src = imageUrl; // Set the image src
    })
    .catch(error => {
        console.error('Error fetching the image:', error);
    });




let films = renderFilms();
async function renderFilms(sortBy) {
    const filmsWrapper = document.querySelector(".film-list");
    filmsWrapper.classList.add('film__loading');
    
    // Fetch the films data
    await getFilms(); // Assuming getFilms() fetches the data correctly
    filmsWrapper.classList.remove('film__loading');

    // Sorting logic
    if (filter === 'A_to_Z') {
        films.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === 'Z_to_A') {
        films.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (filter === 'Oldest_to_Newest') {
        films.sort((a, b) => a.releaseYear - b.releaseYear);
    } else if (filter === 'Newest_to_Oldest') {
        films.sort((a, b) => b.releaseYear - a.releaseYear);
    }

    // Render the sorted films
    const filmsHtml = films.map((film) => FilmHTML(film)).join("");
    filmsWrapper.innerHTML = filmsHtml;
}

// Function to fetch films
async function getFilms() {
    try {
        const response = await fetch("https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON");
        if (!response.ok) throw new Error(`Network response was not ok`);
        const data = await response.json();
        return data; // Ensure this returns the array of films
    } catch (error) {
        console.error('Error fetching films:', error);
    }
}

//added to ensure the element exists before trying to set the src attribute, preventing potential errors if the element is not found in the DOM.
const imageElement = document.querySelector("#yourImageId");
if (imageElement) {
    imageElement.src = "newImageSource.jpg";
} else {
    console.error("Image element not found");
}




// Call renderFilms initially without sorting
setTimeout(() => {
    renderFilms(); // Call without filter initially
}, 1000);


function getFilms() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    url: "https://m.media-amazon.com/images/M/MV5BNjA4ODQ0YjQtZDE3Ni00ZDE1LWExYjQtYjE2ZDEwODg5N2E0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
                },
            ]);
        }, 1000);
    });
}
