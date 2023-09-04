import { yummy } from "./main.js";

export const category = {
    fetchCategory: function (){
        yummy.sideBarItems.eq(1).click(function(){
            $('#details').fadeOut(500)
            yummy.fetchFood('categories.php','category');
        })
    },
    categoryList:(listItem)=>{
        let {strCategory:catName,strCategoryThumb:img,strCategoryDescription:desc} = listItem;
        desc = desc.substring(0,100);
        return  `
                <div class="col-md-6 col-lg-4">
                    <div class="content category">
                        <img src="${img}" class="img-fluid rounded-3 border-0" alt="">
                        <div class="text-white d-flex flex-column justify-content-center" id="overlay" data-cat="${catName}"  >
                            <h3 class="fw-bold text-center" id="foodName">${catName}</h3>
                            <p  class="fs-5 " id="foodDesc">${desc}</p>
                        </div>
                    </div>
                </div>
                
                `;
    },
    catSelector:function(){ 
        let cat = function(){
            $('.category #overlay').click(function(e){
                let catUnique = e.target.closest('#overlay').dataset.cat;
                yummy.fetchFood(`filter.php?c=${catUnique}`,'categoryMeals');
            })
        }
        cat();
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
