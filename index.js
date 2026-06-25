/* ==========================================
   1. BENTO MENU FUNCTIONALITY
   ========================================== */
function openMenu() { 
    document.body.classList.add("menu--open"); 
} 

function closeMenu() { 
    document.body.classList.remove("menu--open"); 
}


/* ==========================================
   2. MAIN SEARCH & ANIMATION LAYER
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Grab elements using the IDs from your HTML
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchBtn');
    const target = document.getElementById('reel');

    if (searchInput && searchButton) {
        
        // Feature: Button background turns black on the very first click
        searchButton.addEventListener('click', () => { 
            searchButton.style.backgroundColor = 'black'; 
        }, { once: true });

        // Primary Core Search Handler Function
        function handleSearch() {
            const searchTerm = searchInput.value.trim();
            
            // Do nothing if the search input field is completely empty
            if (!searchTerm) return; 

            // Feature: Toggle the 'clicked' class for visual button changes
            searchButton.classList.toggle("clicked"); 

            // Feature: Trigger your custom 5-second visual CSS animation on the reel
            if (target) {
                target.classList.toggle('animate-trigger');
            }

            // Feature: Change the display icons and spin the active one
            let icon1 = document.getElementById("icon1");
            let icon2 = document.getElementById("icon2");
            if (icon1 && icon2) {
                if (icon1.style.display === "inline") {
                    icon1.style.display = "inline"; 
                    icon2.style.display = "none"; 
                } else {
                    icon1.style.display = "none"; 
                    icon2.style.display = ""; 
                    icon2.classList.add("icon-spin"); 
                }
            }

            // FIX: Wait exactly 5 seconds (5000ms) for your animation to complete.
            // Once the timer ends, pass the search term directly via URL parameters.
            setTimeout(() => {
                window.location.href = `index2.html?search=${encodeURIComponent(searchTerm)}`;
            }, 5000);
        }

        // Attach layout actions to button click & enter key press
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });

        // Feature: Fallback static client card filter
        // (Kept intact in case you have hardcoded .film-card elements on index.html)
        function filterExistingCards() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.film-card');
            cards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        }
        
        searchButton.addEventListener('click', filterExistingCards);
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') { 
                filterExistingCards(); 
            }
        });
    }
});
