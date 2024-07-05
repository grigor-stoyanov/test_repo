document.addEventListener("DOMContentLoaded", function (e){
    document.querySelector('.CONTACT_FORM__SUBMIT').addEventListener('click', submitFormCallback);
});

function submitFormCallback(e) {
    e.preventDefault(); // prevent form submission
    const email = document.getElementById('email');
    if(email.value === ''){
        const p_warning = document.createElement('p')
        p_warning.textContent = 'Please enter some value';
        email.parentElement.append(p_warning);
        p_warning.class
    }

}

