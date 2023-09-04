import { sideBarToggel } from "./sidebar.js";
import { category } from "./category.js";
import { search } from "./search.js";
import { area } from "./area.js";
import { ingredients } from "./ingredients.js";
import { signUp } from "./signup.js";

// ? Structure
//! - in main page show food list with fetching data from api
// -----------------------------------------------------------------------
// ? -main function for fetching lists

export const yummy = {
    mainUrl: "https://www.themealdb.com/api/json/v1/1/",
    sideBarItems: $("#sideBarItems li"),
    mealsContainer: $('#foodList'),
    searchResults: $('#searchInputs #searchResults'),
    details: $('#details'),
    flag: false,
    fetchFood: async (searchTerm, type) => {
        try {
            $('#loading').show().css('display', 'flex');
            const foodApi = `${yummy.mainUrl}${searchTerm}`;
            const res = await fetch(foodApi);
            if (res.status !== 200) {
                throw new Error("Something went wrong");
            }
            const { meals, categories } = await res.json();
            switch (type) {
                case 'meal':
                case 'categoryMeals':
                case 'area':
                case 'areaMeals':
                case 'ingredient':
                case 'ingredientMeals':
                case 'categoryMeals':
                case 'category':
                case 'search':
                    showMeals(meals?meals:categories,type);
                    break;
                case 'details':
                    yummy.showDetails(meals);
                    break;
                default:
                    console.log('Invalid type');
                    break;
            }
        } catch (err) {
        } finally {
            $('#loading').fadeOut(700);
        }
    },
    backToLanding: function () {
        $('.icoAN , .title').click(function () {
            yummy.details.fadeOut(500);
            yummy.fetchFood('search.php?s=', 'meal');
        })
    },
    //? -Show Meal Details
    showDetails: function (instructions) {
        yummy.flag = true;
        $('#searchInputs').fadeOut(500).css('display', 'none');
        yummy.mealsContainer.empty();
        yummy.details.fadeIn(500).css('display', 'flex');
        let { strInstructions, strMealThumb, strMeal, strArea, strCategory, strYoutube, strSource } = instructions[0];
        $('#instruction').html(strInstructions);
        $('#mealImg').attr('src', strMealThumb);
        $('#mealName').html(strMeal);
        $('#area').html(strArea);
        $('#category').html(strCategory);
        $('.tube').attr('href', strYoutube);
        $('.src').attr('href', strSource);
        for (let i = 1; i <= 20; i++) {
            if (instructions[0][`strIngredient${i}`] !== "" && instructions[0][`strIngredient${i}`] !== null) {
                $('#foodSteps').append(`<button class="tags btn btn-outline-warning fs-5 m-2 ">${instructions[0][`strMeasure${i}`]}-${instructions[0][`strIngredient${i}`]} </button>`);
            }
        }
        this.sideBarItems.click(function () {
            yummy.details.fadeOut(500);
        });
    }
}
// ?  - call random meals in landing page
$('document').ready(function () {
    yummy.fetchFood('search.php?s=', 'meal');
});
// ? - main function to show data on page
function showMeals(List, type) {
    yummy.mealsContainer.empty();
    try {
        List.forEach((listItem, index) => {
            if (index >= 20) return;
            if (type === "meal") {
                $('#searchInputs').fadeOut(500).css('display', 'none');
                const foodHTML = generateFoodHTML(listItem);
                yummy.mealsContainer.append(foodHTML);
            }   else if (type === "category") {
                $('#searchInputs').fadeOut(500).css('display', 'none');
                const foodHTML = category.categoryList(listItem);
                yummy.mealsContainer.append(foodHTML);
            }   else if (type === "area") {
                $('#searchInputs').fadeOut(500).css('display', 'none');
                const foodHTML = area.areaList(listItem);
                yummy.mealsContainer.append(foodHTML);
            }   else if (type === "areaMeals") {
                const foodHTML = area.areaMeals(listItem);
                yummy.mealsContainer.append(foodHTML);
            }   else if (type === "ingredient") {
                const foodHTML = ingredients.ingredientList(listItem);
                yummy.mealsContainer.append(foodHTML);
            }   else if (type === "ingredientMeals") {
                const foodHTML = ingredients.ingredientMeals(listItem);
                yummy.mealsContainer.append(foodHTML);
            }    else if (type === "categoryMeals") {
                const foodHTML = category.categoryMeals(listItem);
                yummy.mealsContainer.append(foodHTML);
            }   else if (type === "search") {
                const foodHTML = generateFoodHTML(listItem);
                yummy.searchResults.fadeIn(500).append(foodHTML);
            }
            
        })
        area.areaSelector();
        ingredients.ingredientsSelector();
        category.catSelector();
        let showIng = () =>{
            $('div[data-id]').click(function(e){
                let mealId = e.target.closest('div').dataset.id;
                if(isNaN(mealId) ){
                yummy.fetchFood(`search.php?s=${mealId}`,'details');
                }else{
                    yummy.fetchFood(`lookup.php?i=${mealId}`,'details');
                }
            })
        }
        showIng();
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...No meals found!',
            text: "Try again!"
        })
    }
}
//? -handle landing page random meals on DOM
function generateFoodHTML(food) {
    let { strMealThumb: img, strMeal: name } = food;
    return `
        <div class="col-md-6 col-lg-4">
            <div class="content">
                <img src="${img}" class="img-fluid rounded-3 border-0" id="foodImg" alt="">
                <div id="overlay" data-id="${name}">
                    <h3 class="fw-bold text-start" id="foodName">${name}</h3>
                </div>
            </div>
        </div>
    `;
}
sideBarToggel()
search.showSearchPage();
category.fetchCategory();
area.fetchArea();
yummy.backToLanding();
search.resetResult();
signUp.showForm();
ingredients.fetchIngredient();
