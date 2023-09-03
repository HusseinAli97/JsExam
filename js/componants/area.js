import { yummy } from "./main.js";

export const area = {
    
    fetchArea: function (){
        yummy.sideBarItems.eq(2).click(function(){
            yummy.fetchFood('list.php?a=list','area');
        })
    },
    areaList: function (areaList){
        let {strArea:areaName} = areaList;
        return`
            <div class="col-md-6 col-lg-4">
                <div class="areas d-flex flex-column justify-content-center align-items-center" data-area="${areaName}">
                    <i class="fas fa-4x fa-map-marker-alt mb-3"></i>
                    <h3 class="fw-bold text-start" id="areaName">${areaName}</h3>
                </div>
            </div>
        `
    },
    areaSelector: function(){
        $('.areas').click(function(e){
            let areaName = e.target.closest('.areas').dataset.area;
            yummy.fetchFood(`filter.php?a=${areaName}`,'areaMeals');
        })
    },
    areaMeals: function (areaList){
        let {strMeal:name,strMealThumb:img,idMeal:id} = areaList;
        return `
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