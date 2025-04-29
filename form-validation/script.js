const form = document.querySelector("#form")
const errorContainer = document.querySelector(".errors")
const errorList = document.querySelector(".errors-list")
const username = document.querySelector("#username")
const password = document.querySelector("#password")
const passwordConf = document.querySelector("#password-confirmation")
const terms = document.querySelector("#terms")




form.addEventListener("submit",(e)=>{

    e.preventDefault()

    clearErrors()

    const errors = []


    if(username.value.length < 6){
        errors.push("Username must be at least 6 characters")
    }

    if(password.value.length < 6){
        errors.push("password must be at least 6 characters")
    }

    if(password.value != passwordConf.value){
        errors.push("Passwords do not match")
    }

    if(!terms.checked){
        errors.push("plzz agree to terms")
    }

    if(errors.length>0){
        showErrors(errors)
    }


})



function showErrors(errors){
    errors.forEach( err => {
        const li = document.createElement("li")
        li.innerText = err
        errorList.appendChild(li)
    })
    errorContainer.classList.add("show")
}

function clearErrors(){
    while(errorList.children[0] != null){
        errorList.removeChild(errorList.children[0])
    }
    errorContainer.classList.remove("show")
}