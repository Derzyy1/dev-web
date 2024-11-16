// Zapnutí / Vypnutí
const toggleButton = document.getElementsByClassName('toggle-mobilenav')[0]
const showNavbar = document.getElementsByClassName('nav-mobile')[0]

toggleButton.addEventListener('click', () => {
      showNavbar.classList.toggle('shownavbar');
});

     