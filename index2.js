function openMenu() {
    document.body.classList += " menu--open";
}

function closeMenu() {
    document.body.classList.remove('menu--open');
}

const FilmListEl = document.querySelector(".film-list");

async function main() {
   const Film = await fetch("https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON");
   const FilmData = await Film.json();
   FilmListEl.innerHTML = FilmData.map((Film) => FilmHTML(Film)).join("");
}

main();

function showFilmPosts(Film) {
    localStorage.setItem("Film", JSON.stringify(Film));
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


let films = renderFilms;

async function renderFilms(filter) {
    const filmsWrapper = document.querySelector(".film-list");

    filmsWrapper.classList += ' film__loading'
    if (!films) {
        books = await getFilms();
    }
    filmsWrapper.classList.remove('film__loading')
    if(filter === 'A_to_Z'){
        console.log(filter)
        books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    }
    else if(filter === 'Z_to_A'){
        console.log(filter)
        books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    }
    else if (filter === 'RATING'){
        books.sort((a, b) => b.rating - a.rating)
    }

     const filmsHtml = films.map((film) => {
        return `<div class="film">
        <figure class="film__img--wrapper">
        <img class="film__img" src="${film.url}" alt="">
        </figure>
        <div class="film__title">
        ${Film.Title}
        </div>
        <div class="film__ratings">
           ${ratingsHTML(Film.rating)}
        </div>
        <div class="film__price">      
            ${priceHTML(Film.originalPrice, Film.salePrice)}
        </div>
    </div>`;
    })
    .join("")
    filmsWrapper.innerHTML = filmsHtml;
    
}
function priceHTML (originalPrice, salePrice) {
    if (!salePrice)
        return `$${originalPrice.toFixed(2)}`
    return `<span class="film__price--normal">$${originalPrice.toFixed(2)}</span>$${salePrice.toFixed(2)}`        

}
function ratingsHTML(rating) {
    let ratingHTML = "";
    for (let i = 0; i < Math.floor(rating); ++i){
        ratingHTML += '<i class="fas fa-star"></i>'
    }

    if (!Number.isInteger(rating)){
        ratingHTML += '<i class="fas fa-star-half-alt"></i>'
    }
    return ratingHTML;
}

function filterFilms(event) {
    renderBooks(event.target.value);
}

setTimeout(() => {
    renderFilms();
});

function getBooks() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                  id: 1,
                  title: "Crack the Coding Interview",
                  url: "assets/crack the coding interview.png",
                  originalPrice: 49.95,
                  salePrice: 14.95,
                  rating: 4.5,
                },
                {
                  id: 2,
                  title: "Atomic Habits",
                  url: "assets/atomic habits.jpg",
                  originalPrice: 39,
                  salePrice: null,
                  rating: 5,
                },
                {
                  id: 3,
                  title: "Deep Work",
                  url: "assets/deep work.jpeg",
                  originalPrice: 29,
                  salePrice: 12,
                  rating: 5,
                },
                {
                  id: 4,
                  title: "The 10X Rule",
                  url: "assets/book-1.jpeg",
                  originalPrice: 44,
                  salePrice: 19,
                  rating: 4.5,
                },
                {
                  id: 5,
                  title: "Be Obsessed Or Be Average",
                  url: "assets/book-2.jpeg",
                  originalPrice: 32,
                  salePrice: 17,
                  rating: 4,
                },
                {
                  id: 6,
                  title: "Rich Dad Poor Dad",
                  url: "assets/book-3.jpeg",
                  originalPrice: 70,
                  salePrice: 12.5,
                  rating: 5,
                },
                {
                  id: 7,
                  title: "Cashflow Quadrant",
                  url: "assets/book-4.jpeg",
                  originalPrice: 11,
                  salePrice: 10,
                  rating: 4,
                },
                {
                  id: 8,
                  title: "48 Laws of Power",
                  url: "assets/book-5.jpeg",
                  originalPrice: 38,
                  salePrice: 17.95,
                  rating: 4.5,
                },
                {
                  id: 9,
                  title: "The 5 Second Rule",
                  url: "assets/book-6.jpeg",
                  originalPrice: 35,
                  salePrice: null,
                  rating: 4,
                },
                {
                  id: 10,
                  title: "Your Next Five Moves",
                  url: "assets/book-7.jpg",
                  originalPrice: 40,
                  salePrice: null,
                  rating: 2,
                },
                {
                  id: 11,
                  title: "Mastery",
                  url: "assets/book-8.jpeg",
                  originalPrice: 30,
                  salePrice: null,
                  rating: 4.5,
                },
            ]);
        }, 1000);
    });
}
