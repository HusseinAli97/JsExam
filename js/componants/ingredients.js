import { yummy } from "./main.js";

export const ingredients = {
    fetchIngredient:  _ =>{
        yummy.sideBarItems.eq(3).click(function(){
            yummy.fetchFood('list.php?i=list','ingredient');
        })
    },
    ingredientList: function (ingredientList){
        let {strIngredient:ingredientName,strDescription:desc} = ingredientList;
        return`           
    <div class="col-md-6 col-lg-4">
        <div class=" ingredients d-flex flex-column justify-content-center align-items-center" data-ingredient="${ingredientName}">
            <i class="fas fa-4x fa-map-marker-alt mb-3"></i>
            <h3 class="fw-bold text-start" id="areaName">${ingredientName}</h3>
            <p  class="fs-4" >${desc.substring(0,100)}</p>
        </div>
    </div>
`
    },
    ingredientsSelector: function(){
        $('.ingredients').click(function(e){
            let ingredientName = e.target.closest('.ingredients').dataset.ingredient;
            yummy.fetchFood(`filter.php?i=${ingredientName}`,'ingredientMeals');
        })
    },
    ingredientMeals: function (ingredientList){
        let {strMeal:name,strMealThumb:img,idMeal:id} = ingredientList;
        return`
        <div class="col-md-6 col-lg-4">
            <div class="content">
                <img src="${img}" class="img-fluid rounded-3 border-0" id="foodImg" alt="">
                <div id="overlay" data-id="${id}">
                    <h3 class="fw-bold text-start" id="foodName">${name}</h3>
                </div>
            </div>
        </div>
        `
    }
}