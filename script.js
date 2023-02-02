'use strict';
// List of variables
const overlay = document.querySelector('.overlay');
const openSearchBtns = document.querySelectorAll('.btn');
const closeSearchBtns = document.querySelectorAll('.closebtn');
const searchRecipeInput = document.querySelector('#search-recipe')
const maxNutrientInput = document.querySelector('#max-nutrient-list');
const maxQuantityInput = document.querySelector('#max-quantity');
const minNutrientInput = document.querySelector('#min-nutrient-list');
const minQuantityInput = document.querySelector('#min-quantity');
const searchByIngredientInput = document.querySelector('#search-ingredient');
const showRecipesBtns = document.querySelectorAll('.recipe-btn');

/* on clicking on every open search button; the overlay will be displayed and class name "invisible" will be 
removed from its parent container */
//Open search recipe button
openSearchBtns[0].addEventListener('click', () => {
    overlay.style.display = 'block';
    document.querySelector('.recipe-search-container').classList.remove('invisible');

})

//Open search by nutrient button
openSearchBtns[1].addEventListener('click', () => {
    overlay.style.display = 'block';
    document.querySelector('.nutrient-search-container').classList.remove('invisible');

})
//Open search by ingredient button
openSearchBtns[2].addEventListener('click', () => {
    overlay.style.display = 'block';
    document.querySelector('.ingredient-search-container').classList.remove('invisible');

})

/* Loop through the list of close buttons(3 buttons) and add an event listener for each as 
on clicking each of them it will change display property of its overlay parent element to none */
closeSearchBtns.forEach(closeSearchBtn => {
    closeSearchBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        closeSearchBtn.parentElement.classList.add('invisible');
    })
})

//First search Button
showRecipesBtns[0].addEventListener('click', () => {
    if (searchRecipeInput.value === '') {
        alert('Please enter a recipe');
    }
    else {
        localStorage.setItem('recipe', searchRecipeInput.value.trim());
        window.open('byRecipe.html', '_blank');
    }
});

//Second search Button
showRecipesBtns[1].addEventListener('click', () => {
    if (maxNutrientInput.value === 'Choose Nutrient' || maxQuantityInput.value == 0 || minNutrientInput.value === 'Choose Nutrient' || minQuantityInput.value == 0) {
        alert('Please enter correct values');
    }
    else {
        localStorage.setItem('maxnutrient', maxNutrientInput.value);
        localStorage.setItem('maxquantity', maxQuantityInput.value);
        localStorage.setItem('minnutrient', minNutrientInput.value);
        localStorage.setItem('minquantity', minQuantityInput.value);
        window.open('byNutrient.html', '_blank');
    }
});
//Third Search Button
showRecipesBtns[2].addEventListener('click', () => {
    if (searchByIngredientInput.value === '') {
        alert('Please enter an ingredient');
    } else {
localStorage.setItem('ingredient', searchByIngredientInput.value);
window.open('byIngredient.html', '_blank');
    }
});