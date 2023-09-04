import { yummy } from "./main.js"

export const signUp = {
    showForm: ( ) =>{
        yummy.sideBarItems.eq(4).click(function(){
            yummy.mealsContainer.empty();
            $('#details').hide(700);
            $('#searchInputs').fadeOut(500).css('display', 'none');
            $('#signUp').fadeIn(500).css('display', 'flex');
            signUp.hideSignUpForm();
        })
    },
    validate : ()=>  {
        let uName = $('#signUp div div:eq(0) input');
        let uEmail = $('#signUp div div:eq(1) input');
        let uPhone = $('#signUp div div:eq(2) input');
        let uAddress = $('#signUp div div:eq(3) input');
        let uPassword = $('#signUp div div:eq(4) input');
        let uCPassword = $('#signUp div div:eq(5) input');
        let submitBtn = $('#signUp div div:eq(6) button');
        let regexName = /^[a-zA-Z]{3,20}$/;
        let regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let regexPhone = /^[0-9]{11}$/;
        let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
        function validateField(input, regex) {
            if (regex.test(input.val())) {
                input.removeClass('is-invalid').addClass('is-valid');
                return true;
            } else {
                input.removeClass('is-valid').addClass('is-invalid');
                return false;
            }
        }
    
        function validatePasswordConfirmation() {
            const password = uPassword.val();
            const confirmPassword = uCPassword.val();
    
            if (password === confirmPassword) {
                uPassword.removeClass('is-invalid').addClass('is-valid');
                uCPassword.removeClass('is-invalid').addClass('is-valid');
                return true;
            } else {
                uPassword.removeClass('is-valid').addClass('is-invalid');
                uCPassword.removeClass('is-valid').addClass('is-invalid');
                return false;
            }
        }
    
        uName.on('input', function() {
            validateField($(this), regexName);
            checkSubmitButton();
        });
    
        uEmail.on('input', function() {
            validateField($(this), regexEmail);
            checkSubmitButton();
        });
    
        uPhone.on('input', function() {
            validateField($(this), regexPhone);
            checkSubmitButton();
        });
    
        uPassword.on('input', function() {
            validateField($(this), regexPassword);
            validatePasswordConfirmation();
            checkSubmitButton();
        });
    
        uCPassword.on('input', function() {
            validatePasswordConfirmation();
            checkSubmitButton();
        });
    
        function checkSubmitButton() {
            if (
                uName.hasClass('is-valid') &&
                uEmail.hasClass('is-valid') &&
                uPhone.hasClass('is-valid') &&
                uPassword.hasClass('is-valid') &&
                validatePasswordConfirmation()
            ) {
                submitBtn.removeClass('disabled');
            } else {
                submitBtn.addClass('disabled');
            }
        }
        submitBtn.click(() => {
            const $signUpForm = $('#signUp');
            const $submitBtn = $signUpForm.find('button');
            $signUpForm.find('input').val('');
            $signUpForm.find('input').removeClass('is-valid is-invalid');
            $submitBtn.addClass('disabled');
        })
    },
    hideSignUpForm:()=>{
        $(yummy.sideBarItems).not(yummy.sideBarItems.eq(4)).click(function(){
            $('#signUp').fadeOut(500).css('display', 'none');
        })
    }
}
signUp.validate();