// 1. Global Selectors & Data Storage
const filmListEl = document.querySelector(".film-list");
let filmsData = [];
let allFilmsMaster = []; // Master backup copy so you can search multiple times on page 2

// 2. Fetch and Initialize Application
async function initApp() {
    try {
        const response = await fetch("https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON");
        allFilmsMaster = await response.json();
        filmsData = [...allFilmsMaster]; // Fill the active working list

        // CRITICAL FIX: Extract the parameter passed from index.html URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlSearchTerm = urlParams.get('search');

        if (urlSearchTerm) {
            const query = urlSearchTerm.toLowerCase().trim();
            
            // Filter the initial view by Title, Genre, Director, or Actors
            filmsData = allFilmsMaster.filter(film => {
                return (film.Title && film.Title.toLowerCase().includes(query)) ||
                       (film.Genre && film.Genre.toLowerCase().includes(query)) ||
                       (film.Director && film.Director.toLowerCase().includes(query)) ||
                       (film.Actors && film.Actors.toLowerCase().includes(query));
            });

            // Set the search bar text on page 2 to match what was searched
            const inputField = document.getElementById('searchInput');
            if (inputField) {
                inputField.value = urlSearchTerm;
            }

            // Show an error if nothing matches the query
            if (filmsData.length === 0) {
                filmListEl.innerHTML = `<p style="text-align: center; width: 100%;">No films found matching "${urlSearchTerm}".</p>`;
                return;
            }
        }

        renderFilms(); // Render filtered (or initial list) once data arrives
    } catch (error) {
        console.error("Error loading films:", error);
        filmListEl.innerHTML = "<p>Failed to load films.</p>";
    }
}

// 3. Centralized Render Function (Handles Sorting & UI Generation)
function renderFilms(sortBy) {
    // Show loading spinner if data hasn't arrived yet
    if (filmsData.length === 0) {
        filmListEl.innerHTML = '<i class="fas fa-spinner Films__loading--spinner"></i>';
        return;
    }

    // Clone data array to avoid mutating the original global list
    let sortedFilms = [...filmsData];

    // Apply sorting algorithms
    if (sortBy === 'A_to_Z') {
        sortedFilms.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortBy === 'Z_to_A') {
        sortedFilms.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (sortBy === 'Newest_to_Oldest') {
        sortedFilms.sort((a, b) => new Date(b.Released) - new Date(a.Released));
    } else if (sortBy === 'Oldest_to_Newest') {
        sortedFilms.sort((a, b) => new Date(a.Released) - new Date(b.Released));
    }

    // Generate HTML combining the best elements of your original layouts
    filmListEl.innerHTML = sortedFilms.map((film) => {
        // Escape single/double quotes in title to prevent breaking the HTML attribute string
        const escapedTitle = film.Title.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `
            <div class="film-card" onclick="showFilmPosts('${escapedTitle}')">
                <div class="film-card__container">
                    <h3>${film.Title}</h3>
                    <p><b>Genre:</b> ${film.Genre}</p>
                    <p><b>Director:</b> ${film.Director}</p>
                    <p><b>Actors:</b> ${film.Actors}</p>
                    <p><b>Released:</b> ${film.Released}</p>
                    <p><b>IMDb Rating:</b> ${film.imdbRating || film.Rating || 'N/A'}</p>
                    <img src="${film.Images?.[0] || film.Images || ''}" alt="Poster for ${film.Title}">
                </div>
            </div>
        `;
    }).join("");
}

// 4. Interaction Events & Routing Helpers
function filterFilms(event) {
    renderFilms(event.target.value);
}

function showFilmPosts(filmTitle) {
    // Find the exact film object by title to save it using master backup data
    const selectedFilm = allFilmsMaster.find(f => f.Title === filmTitle);
    if (selectedFilm) {
        localStorage.setItem("film", JSON.stringify(selectedFilm));
        window.location.href = `${window.location.origin}/film.html`;
    }
}

function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

// 5. Start App on Page Load
document.addEventListener("DOMContentLoaded", initApp);

// 6. Grab elements for local searching functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');

// FIXED: Instead of hiding cards using styling, this filters the master JSON data correctly
function filterExistingCards(event) {
    if (event) event.preventDefault(); // Stop forms from triggering page reloads
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase().trim();

    if (!searchTerm) {
        // If search bar is blanked out, restore full catalog
        filmsData = [...allFilmsMaster];
    } else {
        // Filter live using the unmutated backup array dataset
        filmsData = allFilmsMaster.filter(film => {
            return (film.Title && film.Title.toLowerCase().includes(searchTerm)) ||
                   (film.Genre && film.Genre.toLowerCase().includes(searchTerm)) ||
                   (film.Director && film.Director.toLowerCase().includes(searchTerm)) ||
                   (film.Actors && film.Actors.toLowerCase().includes(searchTerm));
        });
    }

    // Re-run the visual renderer
    if (filmsData.length === 0) {
        filmListEl.innerHTML = `<p style="text-align: center; width: 100%;">No films found matching "${searchInput.value}".</p>`;
    } else {
        renderFilms();
    }
}

// Attach action event triggers to page 2 buttons
if (searchButton && searchInput) {
    searchButton.addEventListener('click', filterExistingCards);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            filterExistingCards(event);
        }
    });
}
