// ===========================
// SELECT HTML ELEMENTS
// ===========================

const form = document.getElementById("todo-form")
const input = document.getElementById("todo-input")
const list = document.getElementById("todo-list")
const counter = document.getElementById("task-counter")
const clearCompleted = document.getElementById("clear-completed")


// ===========================
// ADD NEW TASK
// ===========================

form.addEventListener("submit", (event) => {
    event.preventDefault()

    // Get the text from the input and remove extra spaces
    const taskText = input.value.trim()

    // Don't create a task if the input is empty
    if (taskText === "") {
        return;
    }

    const task = document.createElement("li")
    task.classList.add("todo-item");


    // Making elements to put in <li>
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("todo-checkbox");


    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = taskText;


    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.textContent = "X"


    // Put the checkbox, text, and delete button inside the task
    task.appendChild(checkbox);
    task.appendChild(span);
    task.appendChild(button);

    
    // Added task to lists of task ,adn updated counter , and making imput value empty
    list.appendChild(task);
    updateCounter()
    input.value = ""
});


// ===========================
// COMPLETE / UNCOMPLETE TASK
// ===========================

list.addEventListener("change", (event) => {

    if (event.target.classList.contains("todo-checkbox")) {

        event.target.parentElement.classList.toggle("completed")

        updateCounter()
    }
})


// ===========================
// DELETE A TASK
// ===========================

list.addEventListener("click", (event) => {

    if (event.target.classList.contains("delete-btn")) {

        event.target.parentElement.remove()
        updateCounter()
    }
});


// ===========================
// CLEAR ALL COMPLETED TASKS
// ===========================

clearCompleted.addEventListener("click", () => {

    // Select all task elements
    const tasks = document.querySelectorAll(".todo-item")

    // Go through every task
    tasks.forEach(task => {

        if (task.classList.contains("completed")) {

            task.remove()
            updateCounter()
        }
    });
})


// ===========================
// UPDATE TASK COUNTER
// ===========================

function updateCounter() {

    // Get all current tasks
    const tasks = list.querySelectorAll(".todo-item")

    let remaining = 0

    tasks.forEach((task) => {

        if (!task.classList.contains("completed")) {
            remaining++
        }
    })

    counter.textContent = `${remaining} tasks remaining`
}

// ===========================
// FILTERING
// ===========================

const filterButton = document.querySelectorAll(".filter-btn")

filterButton.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter
        const tasks = document.querySelectorAll(".todo-item")

        filterButton.forEach(buttonn => {
                    buttonn.classList.remove("active")
                });

        

        button.classList.add("active")
        tasks.forEach(task => {
            
            const isCompleted = task.classList.contains("completed")
            

            if (filter === "all") {
                task.classList.remove("hidden");
            }
            else if (filter === "active") {
                if (isCompleted === true) {
                    task.classList.add("hidden")
                } else {
                    task.classList.remove("hidden")
                }
            }
            else if (filter === "completed") {
                if (isCompleted === true) {
                    task.classList.remove("hidden")
                } else {
                    task.classList.add("hidden")
                }
            }
        });
    })
});


updateCounter()