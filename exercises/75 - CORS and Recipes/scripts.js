// Please use this replacement API URL "https://recipes.beginnerjavascript.com/api"
// const baseEndpoint = "https://recipes.beginnerjavascript.com/api";
// const proxy = `https://api.allorigins.win/get?url=`;
// const baseEndpoint = `${proxy}https://recipes.beginnerjavascript.com/api`;
// const baseEndpoint = `${proxy}https://api.edamam.com/api/recipes/v2`;

const proxy = 'https://cors-anywhere.herokuapp.com/';
const endpoint = `${proxy}themealdb.com/api/json/v1/1/search.php`
const form = document.querySelector('.search');
const recipesGrid = document.querySelector('.recipes');

async function fetchRecipes(query) {
    console.log('fetching data...');
    const res = await fetch(`${endpoint}?s=${query}`);
    console.log('converting data to json');
    const data = await res.json();
    return data;
}

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    // disable the button when user searches:
    form.submit.disabled = true;

    // submit the value from the search:
    const recipes = await fetchRecipes(form.query.value);
    console.log(recipes);

    // after results are returned, re-enable button
    form.submit.disabled = false;
    displayRecipes(recipes.meals);
}

function displayRecipes(recipes) {
    console.log('creating the html markup');

    const html = recipes.map((recipe) => {
        const ingredientsArray = Object.keys(recipe)
            .filter(key => key.startsWith("strIngredient") && recipe[key] !== null && recipe[key].trim() !== "")
            .map(key => recipe[key]);

        console.log(`ingredients for ${recipe.strMeal}:`, ingredientsArray);

        let imgHTML = '';
        if (recipe.strMealThumb) {
            imgHTML = '<img src="' + recipe.strMealThumb + '" alt="' + recipe.strMeal + '">';
        }

        return `<div class="recipe">
            <h2>${recipe.strMeal }</h2>
            <p><strong>Ingredients:</strong>${ingredientsArray}</p>
            ${imgHTML}
            <a href="${recipe.strSource}">View Recipe →</a>
        </div>`
    });
    recipesGrid.innerHTML = html.join("");
}

form.addEventListener('submit', handleSubmit);