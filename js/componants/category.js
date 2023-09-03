import { yummy } from "./main.js";

export const category = {
    fetchCategory: function (){
        yummy.sideBarItems.eq(1).click(function(){
            yummy.fetchFood('categories.php','category');
        })
    },
    categoryList:(listItem)=>{
        let {strCategory:catName,strCategoryThumb:img,strCategoryDescription:desc} = listItem;
        desc = desc.substring(0,100);
        return  `
                <div class="col-md-6 col-lg-4">
                    <div class="content" data-cat="${catName}">
                        <img src="${img}" class="img-fluid rounded-3 border-0" id="foodImg" alt="">
                        <div class="text-white d-flex flex-column justify-content-center" id="overlay" >
                            <h3 class="fw-bold text-center" id="foodName">${catName}</h3>
                            <p  class="fs-4" id="foodDesc">${desc}</p>
                        </div>
                    </div>
                </div>
                
                `;
    },
    categorySelector: function(){
        $('.content').click(function(e){
            let catName = e.target.closest('.content').dataset.cat;
            yummy.fetchFood(`filter.php?c=${catName}`,'categoryMeals');
        })
    },
    categoryMeals: function (listItem){
        let {strMeal:name,strMealThumb:img,idMeal:id} = listItem;
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
