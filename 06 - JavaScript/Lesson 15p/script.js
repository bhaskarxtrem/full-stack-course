const form = document.getElementById("todo-form")
const input = document.getElementById("todo-input")
const list = document.getElementById("todo-list")
const counter = document.getElementById("task-counter")
const clearCompleted = document.getElementById("clear-completed")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const taskText = input.value
    const task = document.createElement("li")
    task.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("todo-checkbox");

    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = taskText;

    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.textContent = "X"



    task.appendChild(checkbox);
    task.appendChild(span);
    task.appendChild(button);

    list.appendChild(task);
    updateCounter()
    input.value = ""
});

list.addEventListener("change", (event) => {
    if (event.target.classList.contains("todo-checkbox")) {
        event.target.parentElement.classList.toggle("completed")
        updateCounter()
    }
})

list.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove()
        updateCounter()
    }
});

clearCompleted.addEventListener("click", () => {
    const tasks = document.querySelectorAll(".todo-item")

    tasks.forEach(task => {
        if (task.classList.contains("completed")) {
            task.remove()
            updateCounter()
        }
    });
})

function updateCounter() {
    const tasks = list.querySelectorAll(".todo-item")

    let remaining = 0

    tasks.forEach((task) => {
        if (!task.classList.contains("completed")) {
            remaining++
        }
    })

    counter.textContent = `${remaining} tasks remaining`
}

updateCounter()



