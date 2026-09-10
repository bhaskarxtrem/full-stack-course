// ===========================
// SELECT HTML ELEMENTS
// ===========================

const form = document.getElementById("todo-form")
const input = document.getElementById("todo-input")
const list = document.getElementById("todo-list")
const counter = document.getElementById("task-counter")
const clearCompleted = document.getElementById("clear-completed")
const filterButton = document.querySelectorAll(".filter-btn")
const emptyState = document.getElementById("empty-state")
const themeToggle = document.getElementById("theme-toggle")


let currentFilter = "all"
let tasks = []
let theme = {value: true}

let loadedTasks = localStorage.getItem('tasks')

if (loadedTasks) {
    tasks = JSON.parse(loadedTasks)

    tasks.forEach(taskk => {
        const task = document.createElement("li")
        task.classList.add("todo-item");
        task.dataset.id = taskk.id

        // Making elements to put in <li>
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("todo-checkbox");
        if (taskk.completed === true) {
            checkbox.checked = true
            task.classList.add("completed")
        }

        const span = document.createElement("span");
        span.classList.add("todo-text");
        span.textContent = taskk.text;


        const button = document.createElement("button");
        button.classList.add("delete-btn");
        button.textContent = "X"


        // Put the checkbox, text, and delete button inside the task
        task.appendChild(checkbox);
        task.appendChild(span);
        task.appendChild(button);


        // Added task to lists of task ,adn updated counter , and making imput value empty
        list.appendChild(task);
    });
    updateCounter()
    applyFilter()
}

const loadTheme = JSON.parse(localStorage.getItem('theme'))

if (loadTheme) {
    theme.value = loadTheme.value

    if (theme.value === true) {
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
    }

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Light Mode"
    } else {
        themeToggle.textContent = "Dark Mode"
    }
}



// ===========================
// THEME TOGGLE
// ===========================

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Light Mode"
        theme.value = true
        localStorage.setItem('theme', JSON.stringify(theme))
    } else {
        themeToggle.textContent = "Dark Mode"
        theme.value = false
        localStorage.setItem('theme', JSON.stringify(theme))
    }
})

applyFilter()
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

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(newTask)

    localStorage.setItem('tasks', JSON.stringify(tasks))

    const task = document.createElement("li")
    task.classList.add("todo-item");
    task.dataset.id = newTask.id


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
    applyFilter()
});

function applyFilter() {
    const tasks = document.querySelectorAll(".todo-item")
    let visibleTasks = 0
    tasks.forEach(task => {

        const isCompleted = task.classList.contains("completed")


        if (currentFilter === "all") {
            task.classList.remove("hidden");
            visibleTasks++
        }
        else if (currentFilter === "active") {
            if (isCompleted === true) {
                task.classList.add("hidden")

            } else {
                task.classList.remove("hidden")
                visibleTasks++
            }
        }
        else if (currentFilter === "completed") {
            if (isCompleted === true) {
                task.classList.remove("hidden")
                visibleTasks++
            } else {
                task.classList.add("hidden")
            }
        }
    });
    if (visibleTasks === 0) {
        emptyState.classList.remove("hidden")
    } else {
        emptyState.classList.add("hidden")
    }
}
// ===========================
// COMPLETE / UNCOMPLETE TASK
// ===========================

list.addEventListener("change", (event) => {

    if (event.target.classList.contains("todo-checkbox")) {

        event.target.parentElement.classList.toggle("completed")

        const taskId = event.target.parentElement.dataset.id

        const taskData = tasks.find(task => task.id == taskId)
        if (event.target.parentElement.classList.contains("completed")) {
            taskData.completed = true
        } else {
            taskData.completed = false
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))



        updateCounter()
        applyFilter()
    }

})


// ===========================
// DELETE A TASK
// ===========================

list.addEventListener("click", (event) => {

    if (event.target.classList.contains("delete-btn")) {

        event.target.parentElement.remove()

        const taskId = event.target.parentElement.dataset.id
        const index = tasks.findIndex(task => task.id == taskId)
        
        if (index !== -1) {
            tasks.splice(index, 1);
        }

        localStorage.setItem('tasks', JSON.stringify(tasks))


        updateCounter()
    }
    applyFilter()
});


// ===========================
// CLEAR ALL COMPLETED TASKS
// ===========================

clearCompleted.addEventListener("click", () => {

    // Select all task elements
    const tasksElement = document.querySelectorAll(".todo-item")

    // Go through every task
    tasksElement.forEach(task => {

        if (task.classList.contains("completed")) {
            task.remove()

            updateCounter()
        }
    });
    tasks = tasks.filter(task => !task.completed)

    localStorage.setItem('tasks', JSON.stringify(tasks))
    applyFilter()

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

    if (remaining === 0) {
        counter.textContent = "No Tasks remaining"
    }
    else if (remaining === 1) {
        counter.textContent = `${remaining} task remaining`
    }
    else if (remaining > 1) {
        counter.textContent = `${remaining} tasks remaining`
    }
}

// ===========================
// FILTERING
// ===========================


filterButton.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter


        filterButton.forEach(buttonn => {
            buttonn.classList.remove("active")
        });



        button.classList.add("active")
        applyFilter()
    })
});


updateCounter()