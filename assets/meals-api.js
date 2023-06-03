// DEPENEDENCIES

var recipeCardEl = document.getElementsByClassName("card-section");

var searchInputEl = document.querySelector(".search__input");
var searchButtonEl = document.querySelector("#search-button");



// DATA
w = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
var targetWidth = 576;
//FUNCTIONS

function getMealCards() {

    var requestUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputEl.value}`

    fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var meals = data.meals;
      
      document.getElementsByClassName("card-container")[0].innerHTML = ""

      for (i = 0; i < 16; i++) {
        console.log(meals);
        var mealId = meals[i].idMeal;
        
        var recipeTitle = meals[i].strMeal;
        var recipeImg = meals[i].strMealThumb;
        // generates a card for the recipe info to live
        var recipeCard = document.createElement("div");
        var imgDiv = document.createElement("div");
        var titleDiv = document.createElement("div");
        var cardImgEl = document.createElement("img");
        var cardTitleEl = document.createElement("p");
        
        imgDiv.classList.add("card-section");
        imgDiv.classList.add("card-section-img");
        titleDiv.classList.add("card-section");
        titleDiv.classList.add("card-section-title");
        recipeCard.classList.add("card");
        recipeCard.setAttribute('onclick', 'popup()');
        recipeCard.setAttribute('data-mealid', mealId);
        cardImgEl.classList.add("meal-img");
        cardImgEl.src = recipeImg;
        cardTitleEl.textContent = recipeTitle;

        document.querySelector(".card-container").appendChild(recipeCard);
        recipeCard.appendChild(imgDiv);
        recipeCard.appendChild(titleDiv);
        imgDiv.appendChild(cardImgEl);
        titleDiv.appendChild(cardTitleEl);

        recipeCard.addEventListener("click" , function(event) {
          console.log("ya clicked a recipe...CONGRATS!");
          var target = event.target;
          while (!target.classList.contains('card')) {
            target = target.parentElement;
          }
            console.log(target);
            var mealId =target.getAttribute('data-mealid');
            getMealRecipe(mealId);
        }, true)
      }    
    })
  }
  
  function getMealRecipe(id) {
    var requestUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    
          fetch(requestUrl)
          .then(function (response) {
              console.log(response);
               return response.json();
          })
          .then(function (data) {
              console.log(data);
              var popUp = document.querySelector('.popup-content-box');
              popUp.textContent = ""

              var titleDiv = document.createElement("div");
              var infoDiv = document.createElement("div");

              var title = document.createElement("h2");
              var img = document.createElement("img");
              var recipeItems = document.createElement("ul");
              var recipeInstructions = document.createElement("p");

              title.textContent = data.meals[0].strMeal;
              img.src = data.meals[0].strMealThumb;
              recipeInstructions.textContent = data.meals[0].strInstructions;

              titleDiv.setAttribute('id', 'modal-header');
              infoDiv.setAttribute('id', 'modal-info');
              title.setAttribute("id", "modal-title");
              img.setAttribute("id", "modal-img");
              recipeItems.setAttribute("id", "modal-items");
              recipeInstructions.setAttribute("id", "modal-instructions");
              
              popUp.appendChild(titleDiv);
              popUp.appendChild(infoDiv);

              titleDiv.appendChild(title);
              infoDiv.appendChild(img);
              infoDiv.appendChild(recipeItems);
              infoDiv.appendChild(recipeInstructions);
              
              for (var i = 1; i <= 20; i++) {
                var ingredient = data.meals[0]["strIngredient" + i];
                var measure = data.meals[0]["strMeasure" + i];
                console.log(ingredient);
                if (ingredient && measure) {
                  var ingLi = document.createElement("li");

                  ingLi.textContent = measure + " " + ingredient;

                  recipeItems.appendChild(ingLi);
                }
                else if (ingredient) {
                  var ingLi = document.createElement("li");

                  ingLi.textContent = ingredient;

                  recipeItems.appendChild(ingLi);
                }
              }
              
              
              
              
          })
  }
  
  // getMealRecipe();
  
  // USER INTERACTIONS
  
searchInputEl.addEventListener("keydown", function (e) {
  if (e.code === 'Enter') {
    e.preventDefault();
    console.log("button clicked!");
    // document.getElementsByClassName("card-container").removeChild(document.getElementsByClassName("card"));
    getMealCards();
    searchInputEl.value = ""
  }
})

// appendRecipes

// INITILIZATIONS