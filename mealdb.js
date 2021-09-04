const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
const toggleSearch = (displayStyle) => {
  document.getElementById("search-result").style.display = displayStyle;
};

const searchFood = () => {
  const searchField = document.getElementById("search-field");
  //display Spinner
  toggleSpinner("block");
  toggleSearch("none");
  const searchText = searchField.value;
  const noFound = document.getElementById("no-found");
  //   clear Data
  searchField.value = "";
  if (searchText == "") {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = ` 
    <h3 class="text-danger"> Input a Valid  </h3> 
    `;
    noFound.appendChild(div);
  } else {
    //Load Data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.meals));
  }
};

const displaySearchResult = (meals) => {
  const SearchResult = document.getElementById("search-result");
  console.log(meals);

  SearchResult.textContent = "";

  meals.forEach((meal) => {
    // console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
       <div class="card-body ">
       //Templte String a conditons 
       <p>${meal.strIngredient8 ? meal.strIngredient8 : ""} </p>
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}
        
        </p>
    </div> 
      
  </div>
      
      `;

    SearchResult.appendChild(div);
  });
  toggleSpinner("none");
  toggleSearch("block");
};

const loadMealDetail = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
  console.log(meal);

  const mealDetails = document.getElementById("meal-details");
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">
    ${meal.strInstructions.slice(0, 150)}
    </p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
  `;
  mealDetails.appendChild(div);
};
