'use strict';
// List of variables
const API_KEY = '#################';
const gridRow = document.querySelector('.row');
const recipeImage = document.querySelector('.recipe-image img');
const recipeTitle = document.querySelector('.recipe-title h1');
const stepsContainer = document.querySelector('.steps ol');
const amountsContainer = document.querySelector('.measurments ul');
const recipeInfo = document.querySelector('.recipe-info');
const toTop = document.querySelector('.bi-arrow-up-circle-fill');

//Function to retrieve single recipe and its details

const singleRecipe = () => {
    const LOCALDATA = localStorage.getItem('index');
    const recipeValue = localStorage.getItem('recipe');
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${recipeValue}&number=20&fillIngredients=true&addRecipeInformation=true`)
        .then(res => res.json())
        .then(res => {
            recipeTitle.textContent = res.results[LOCALDATA].title;
            recipeImage.src = `${res.results[LOCALDATA].image}`;
            recipeInfo.innerHTML = `
    <p>Prepare Duration: ${res.results[LOCALDATA].readyInMinutes
                } minutes</p>
    <p>Recipe Link Source : <a href="${res.results[LOCALDATA].sourceUrl}" class="text-success">Recipe Link</a></p>
    <p> About Recipe : <a href="${res.results[LOCALDATA].spoonacularSourceUrl}" class="text-success">More Details</a></p>
    <p>Servings :${res.results[LOCALDATA].servings}</p>`
            res.results[LOCALDATA].extendedIngredients.forEach(ing => {
                gridRow.insertAdjacentHTML('beforeend', `<div class="cell col-lg-4 p-2">
                        <div class="card w-50  m-auto p-1">
                            <div class="image text-center">
                                <img src="https://spoonacular.com/cdn/ingredients_100x100/${ing.image}"
                                    class="ing-image  rounded-1">
                            </div>
                            <div class="name text-center">
                                <h4 class="p-1"><b>${ing.name}</b></h4>
                            </div>
                        </div>
                        </div>`)
                amountsContainer.insertAdjacentHTML('beforeend', `
                    <li>${ing.original}</li>
    `)
            });
            res.results[LOCALDATA].analyzedInstructions[0].steps.forEach(step => {
                let listElement = document.createElement('li');
                listElement.setAttribute('class', 'step  p-1');
                listElement.textContent = `${step.step}`;
                stepsContainer.appendChild(listElement);


            }

            )
            
        })
        .catch(err => console.log(err));
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
