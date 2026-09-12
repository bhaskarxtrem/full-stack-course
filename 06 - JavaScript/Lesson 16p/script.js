const form = document.getElementById("form")
const username = document.getElementById("username")
const usernameMessage = username.parentElement.querySelector(".validation-message")

const email = document.getElementById("email")
const emailMessage = email.parentElement.querySelector(".validation-message")

const password = document.getElementById("password")
const passwordMessage = password.parentElement.querySelector(".validation-message")

const confirmPassword = document.getElementById("confirm-password")
const confirmPasswordMessage = confirmPassword.parentElement.querySelector(".validation-message")

const popupOverlay = document.getElementById("popup-overlay")
const closePopup = document.getElementById("close-popup")


function validateUsername() {
    if (username.value.trim() === "") {
        usernameMessage.classList.remove("success")
        usernameMessage.classList.add("error")
        usernameMessage.textContent = "Username is required!"
        return false
    }
    else if (username.value.length < 4) {
        usernameMessage.classList.remove("success")
        usernameMessage.classList.add("error")
        usernameMessage.textContent = "Username must be atleast 4 characters!"
        return false
    }
    else {
        usernameMessage.classList.remove("error")
        usernameMessage.classList.add("success")
        usernameMessage.textContent = "Username looks Good!"
        return true
    }
}


function validateEmail() {
    const emailPattern = /^.+@.+\..+$/
    if (email.value.trim() === "") {
        emailMessage.classList.remove("success")
        emailMessage.classList.add("error")
        emailMessage.textContent = "Email is required!"
        return false
    }

    else if (emailPattern.test(email.value.trim())) {
        emailMessage.classList.remove("error")
        emailMessage.classList.add("success")
        emailMessage.textContent = "Email looks Good!"
        return true
    }
    else {
        emailMessage.classList.remove("success")
        emailMessage.classList.add("error")
        emailMessage.textContent = "Please enter a valid email!"
        return false
    }
}

function validatePassword() {
    if (password.value.trim() === "") {
        passwordMessage.classList.remove("success")
        passwordMessage.classList.add("error")
        passwordMessage.textContent = "Password is required!"
        return false
    }

    else if (password.value.trim().length < 8) {
        passwordMessage.classList.remove("success")
        passwordMessage.classList.add("error")
        passwordMessage.textContent = "Password must be atleast 8 characters!"
        return false
    }

    else if (/[0-9]/.test(password.value.trim())) {
        passwordMessage.classList.remove("error")
        passwordMessage.classList.add("success")
        passwordMessage.textContent = "Password looks Good!"
        return true
    }

    else {
        passwordMessage.classList.remove("success")
        passwordMessage.classList.add("error")
        passwordMessage.textContent = "Password must contain atleast one number!"
        return false
    }
}


function validateConfirmPassword() {
    const confirmValue = confirmPassword.value.trim()
    const passwordValue = password.value.trim()

    if (confirmValue === "") {
        confirmPasswordMessage.classList.remove("success")
        confirmPasswordMessage.classList.add("error")
        confirmPasswordMessage.textContent = "Please confirm your password!"
        return false
    }

    else if (confirmValue === passwordValue) {
        confirmPasswordMessage.classList.remove("error")
        confirmPasswordMessage.classList.add("success")
        confirmPasswordMessage.textContent = "Passwords match!"
        return true
    }

    else {
        confirmPasswordMessage.classList.remove("success")
        confirmPasswordMessage.classList.add("error")
        confirmPasswordMessage.textContent = "Passwords do not match!"
        return false
    }
}


username.addEventListener("input", () => {

    validateUsername()
})
username.addEventListener("blur", () => {
    if (username.value.trim() !== "" && username.value.trim().length >= 4) {
        usernameMessage.classList.remove("success")
        usernameMessage.textContent = ""
    }
})




email.addEventListener("input", () => {

    validateEmail()

})



password.addEventListener("input", () => {

    validatePassword()
})



confirmPassword.addEventListener("input", () => {

    validateConfirmPassword()
})



form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const usernameValid = validateUsername()
    const emailValid = validateEmail()
    const passwordValid = validatePassword()
    const confirmValid = validateConfirmPassword()

    if (usernameValid && emailValid && passwordValid && confirmValid) {
        popupOverlay.classList.add("show")  
    }
})

closePopup.addEventListener("click", () => {
    popupOverlay.classList.remove("show")
})