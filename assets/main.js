// Search Bar

// Vars
const toggleSearch = (search, button) =>{
    const searchBar = document.getElementById(search),
          searchButton = document.getElementById(button)
 
    searchButton.addEventListener('click', () =>{
        // We add the show-search class, so that the search bar expands
        searchBar.classList.toggle('show-search')
    });
 };

 toggleSearch('search-bar', 'search-button');

//  End Search Bar

// =================================================================== //

// Popup

function createPopup(id){
    let popupNode = document.querySelector(id);
    let overlay = popupNode.querySelector('.overlay');
    let closeBtn = popupNode.querySelector('.close-btn');
    function openPopup(){
        popupNode.classList.add('active');
    }
    function closePopup(){
        popupNode.classList.remove('active');
    }

    overlay.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);
    return openPopup;
}

let popup = createPopup('#popup');

// End Popup