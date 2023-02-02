'use strict';
// List of variables
const API_KEY = '#################';//API KEY from https://spoonacular.com/food-api.com/
const gridRow = document.querySelector('.row');
const toTop = document.querySelector('.bi-arrow-up-circle-fill');

// Function to retrieve a list of recipes by Name
const getByRecipe = () => {
    const recipeValue = localStorage.getItem('recipe');
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${recipeValue}&number=20&fillIngredients=true&addRecipeInformation=true`)
        .then(response => response.json())
        .then(response => {
            response.results.forEach(result => {
                let recipeLink = document.createElement('a');
                recipeLink.setAttribute('href', 'singleRecipe.html');
                recipeLink.setAttribute('target', '_self');
                recipeLink.setAttribute('class', 'col-lg-4 col-md-6 col-sm-12 p-1 text-decoration-none text-success');
                recipeLink.setAttribute('data-index', response.results.indexOf(result));
                recipeLink.insertAdjacentHTML('beforeend', `
    <div class="card w-75 m-auto">
        <img src="${result.image}" class="card-img-top" alt="recipe-image">
        <div class="card-body">
            <h5 class="card-title">${result.title}</h5> 
            <button type="button" class="btn btn-success">Read More!</button>
        </div>    
</div>
    `)
                gridRow.appendChild(recipeLink);
                recipeLink.onclick = function () {
                    localStorage.setItem('index', recipeLink.getAttribute('data-index'));

                }

            });
        })
        .catch(error => console.log(error))

};
//Function to retrieve a list of recipes by Nutrient
const getByNutrient = () => {
const maxNutrientValue = localStorage.getItem('maxnutrient');
const maxQuantityValue = localStorage.getItem('maxquantity');
const minNutrientValue = localStorage.getItem('minnutrient');
const minQuantityValue = localStorage.getItem('minquantity');
fetch(`https://api.spoonacular.com/recipes/findByNutrients?${minNutrientValue}=${minQuantityValue}&${maxNutrientValue}=${maxQuantityValue}&number=20&apiKey=${API_KEY}`)
    .then(response=>response.json())
    .then(response=>{
        response.forEach(res=>{
            gridRow.insertAdjacentHTML('beforeend',`
            <div class="col-lg-4 col-md-6 col-sm-12 p-1">
            <div class="card w-75 m-auto">
            <img src="${res.image}" class="card-img-top" alt="recipe-image">
            <div class="card-body">
                <h5 class="card-title text-success">${res.title}</h5>
           </div>   
       </div>
       </div>
        `)

        })
       
    }) 
    .catch(error=>console.log(error));
    localStorage.clear();
 };
//Function to retrieve a list of recipes by Ingredient
const getByIngredient = () => { 
    const ingredientValue = localStorage.getItem('ingredient');
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredientValue}&number=20&addRecipeInformation=true`)
    .then(response=>response.json())
    .then(response=>{
        response.forEach(res=>{
            gridRow.insertAdjacentHTML('beforeend',`
            <div class="col-lg-4 col-md-6 col-sm-12 p-1">
            <div class="card w-75 m-auto">
            <img src="${res.image}" class="card-img-top" alt="recipe-image">
            <div class="card-body">
                <h5 class="card-title text-success">${res.title}</h5>
           </div>   
       </div>
       </div>
        `)
        })
       
    })
    .catch(error=>console(error));
    localStorage.clear();
};


/* When scrolling down through the webpage an icon appears to be clicked if user wished to move to the top 
of the webpage once again  */
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTop.style.visibility = "visible";
    } else {
        toTop.style.visibility = "hidden";
    }
})
toTop.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})
