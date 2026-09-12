const form = document.getElementById("form")
const username = document.getElementById("username")

const usernameMessage = username.parentElement.querySelector(".validation-message")

username.addEventListener("input", () => {

    if (username.value.trim() === "") {
        usernameMessage.classList.remove("success")
        usernameMessage.classList.add("error")
        usernameMessage.textContent = "Username is required!"
    }
    else if (username.value.length < 4) {
        usernameMessage.classList.remove("success")
        usernameMessage.classList.add("error")
        usernameMessage.textContent = "Username must be atleast 4 characters!"
    }
    else {
        usernameMessage.classList.remove("error")
        usernameMessage.classList.add("success")
        usernameMessage.textContent = "Username looks Good!"
    }

    username.addEventListener("blur", () => {
        if (username.value.trim() !== "" && username.value.trim().length >= 4) {
            usernameMessage.classList.remove("success")
            usernameMessage.textContent = ""
        }
    })


})