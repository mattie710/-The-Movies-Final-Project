//http://www.omdbapi.com/?apikey=[yourkey]&
//http://img.omdbapi.com/?apikey=[yourkey]&


/* Bento Menu */
function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

/* Search Button */
const btn = document.querySelector('#searchBtn'); 
btn.addEventListener('click', () => { 
    btn.style.backgroundColor = 'black'; // Change to your desired color }, { once: true });
document.getElementById("searchBtn").addEventListener("click", function() {
  this.classList.toggle("clicked"); // Toggle the clicked class
});
  // Change the icons
  let icon1 = document.getElementById("icon1");
  let icon2 = document.getElementById("icon2");

  if (icon1.style.display === "inline") {
    icon1.style.display = "inline"; // Show the first icon
    icon2.style.display = "none";   // Hide the second icon 
  } 
  else {
    icon1.style.display = "none";   // Hide the first icon
    icon2.style.display = "";  // Show the second icon
    icon2.classList.add("icon-spin"); // Add the clicked class to the second icon
  }
});

const button = document.getElementById('searchBtn');
const target = document.getElementById('reel');

button.addEventListener('click', () => {
  target.classList.toggle('animate-trigger');
});





   
    