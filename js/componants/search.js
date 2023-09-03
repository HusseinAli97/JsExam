import { yummy } from "./main.js";

export const search = {
    nameInput: $('input[name="searchByName"]'),
    letterInput: $('input[name="searchByLetter"]'),
    showSearchPage: function () {
        yummy.sideBarItems.eq(0).click(function () {
            if(yummy.flag){
                search.clr();
                yummy.flag = false;
            }
            yummy.mealsContainer.empty();
            $('#details').hide(700);
            $('#searchInputs').fadeIn(500).css('display', 'flex');
            $('#sideBar').css('z-index', '10000');

        })
    },
    searchByName: function () {
        let regExp = /^[a-zA-Z]{5,16}$/;
        this.nameInput.on('input', function (e) {
            if (regExp.test(e.target.value)) {
                yummy.fetchFood(`search.php?s=${e.target.value}`, 'search');
            } else {
                if (e.target.value.length === 1) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'bottom',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: 'At least 5 characters'
                    })
                }
            }
        if(e.target.value.length < 5 ){
            yummy.searchResults.empty();
        }
        })
    },
    searchByLetter: function () {
        let regExp = /^[a-zA-Z]{1}$/;
        this.letterInput.on('input', function (e) {
            yummy.searchResults.empty();
            if (regExp.test(e.target.value)) {
                yummy.fetchFood(`search.php?f=${e.target.value}`, 'search');
            }
        })
    },
    clr:()=>{
        yummy.searchResults.empty();
        search.nameInput.val('');
        search.letterInput.val('');
    },
    resetResult : function(){
        $(yummy.sideBarItems).not(yummy.sideBarItems.eq(0)).click(function(){
            search.clr();
        })
    },
}

search.searchByName();
search.searchByLetter();
