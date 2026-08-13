// ========================================
// TASKORA
// TASK MANAGEMENT SYSTEM
// ========================================


// ========================================
// MOBILE MENU
// ========================================

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});



// ========================================
// TASK VARIABLES
// ========================================

const taskForm =
    document.getElementById("taskForm");

const taskInput =
    document.getElementById("taskInput");

const priorityInput =
    document.getElementById("priorityInput");

const dateInput =
    document.getElementById("dateInput");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const filterInput =
    document.getElementById("filterInput");



// ========================================
// STATISTICS
// ========================================

const totalTasks =
    document.getElementById("totalTasks");

const completedTasks =
    document.getElementById("completedTasks");

const pendingTasks =
    document.getElementById("pendingTasks");


const heroTotal =
    document.getElementById("heroTotal");

const heroCompleted =
    document.getElementById("heroCompleted");

const heroPending =
    document.getElementById("heroPending");


const previewTotal =
    document.getElementById("previewTotal");

const previewCompleted =
    document.getElementById("previewCompleted");

const previewPending =
    document.getElementById("previewPending");



// ========================================
// LOAD TASKS FROM LOCAL STORAGE
// ========================================

let tasks =
    JSON.parse(
        localStorage.getItem("taskoraTasks")
    ) || [];



// ========================================
// ADD TASK
// ========================================

taskForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const taskName =
            taskInput.value.trim();


        if (taskName === "") {

            alert("Please enter a task.");

            return;

        }


        const task = {

            id: Date.now(),

            name: taskName,

            priority:
                priorityInput.value,

            date:
                dateInput.value,

            completed: false

        };


        tasks.push(task);


        saveTasks();


        displayTasks();


        updateStatistics();


        taskForm.reset();

    }
);



// ========================================
// SAVE TASKS
// ========================================

function saveTasks() {

    localStorage.setItem(
        "taskoraTasks",
        JSON.stringify(tasks)
    );

}



// ========================================
// DISPLAY TASKS
// ========================================

function displayTasks() {

    taskList.innerHTML = "";


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filter =
        filterInput.value;


    let filteredTasks =
        tasks.filter(task => {

            const matchesSearch =
                task.name
                    .toLowerCase()
                    .includes(searchText);


            let matchesFilter = true;


            if (filter === "completed") {

                matchesFilter =
                    task.completed === true;

            }


            if (filter === "pending") {

                matchesFilter =
                    task.completed === false;

            }


            return (
                matchesSearch &&
                matchesFilter
            );

        });


    if (filteredTasks.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    filteredTasks.forEach(task => {

        const taskElement =
            document.createElement("div");


        taskElement.className =
            "task-item";


        if (task.completed) {

            taskElement.classList.add(
                "completed"
            );

        }


        let priorityClass = "";


        if (task.priority === "Low") {

            priorityClass =
                "priority-low";

        }


        if (task.priority === "Medium") {

            priorityClass =
                "priority-medium";

        }


        if (task.priority === "High") {

            priorityClass =
                "priority-high";

        }


        let formattedDate =
            "No due date";


        if (task.date) {

            formattedDate =
                new Date(
                    task.date + "T00:00:00"
                ).toLocaleDateString();

        }


        taskElement.innerHTML = `

            <div class="task-info">

                <div class="task-name">

                    ${escapeHTML(task.name)}

                </div>


                <div class="task-details">

                    <span
                        class="priority ${priorityClass}"
                    >
                        ${task.priority}
                    </span>


                    <span class="task-date">

                        Due:
                        ${formattedDate}

                    </span>

                </div>

            </div>


            <div class="task-actions">

                <button
                    class="task-action complete-btn"
                    onclick="toggleTask(${task.id})"
                >

                    ${
                        task.completed
                        ? "Undo"
                        : "Complete"
                    }

                </button>


                <button
                    class="task-action delete-btn"
                    onclick="deleteTask(${task.id})"
                >

                    Delete

                </button>

            </div>

        `;


        taskList.appendChild(
            taskElement
        );

    });

}



// ========================================
// COMPLETE / UNCOMPLETE TASK
// ========================================

function toggleTask(id) {

    tasks =
        tasks.map(task => {

            if (task.id === id) {

                return {

                    ...task,

                    completed:
                        !task.completed

                };

            }


            return task;

        });


    saveTasks();


    displayTasks();


    updateStatistics();

}



// ========================================
// DELETE TASK
// ========================================

function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmDelete) {

        return;

    }


    tasks =
        tasks.filter(task => {

            return task.id !== id;

        });


    saveTasks();


    displayTasks();


    updateStatistics();

}



// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    // Main statistics

    totalTasks.textContent =
        total;


    completedTasks.textContent =
        completed;


    pendingTasks.textContent =
        pending;


    // Hero statistics

    heroTotal.textContent =
        total;


    heroCompleted.textContent =
        completed;


    heroPending.textContent =
        pending;


    // Dashboard preview

    previewTotal.textContent =
        total;


    previewCompleted.textContent =
        completed;


    previewPending.textContent =
        pending;

}



// ========================================
// SEARCH
// ========================================

searchInput.addEventListener(
    "input",
    function() {

        displayTasks();

    }
);



// ========================================
// FILTER
// ========================================

filterInput.addEventListener(
    "change",
    function() {

        displayTasks();

    }
);



// ========================================
// PREVENT HTML INJECTION
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}



// ========================================
// FAQ
// ========================================

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(item => {

    const question =
        item.querySelector(
            ".faq-question"
        );


    question.addEventListener(
        "click",
        () => {

            const currentlyActive =
                document.querySelector(
                    ".faq-item.active"
                );


            if (
                currentlyActive &&
                currentlyActive !== item
            ) {

                currentlyActive.classList
                    .remove("active");


                const oldAnswer =
                    currentlyActive.querySelector(
                        ".faq-answer"
                    );


                oldAnswer.style.maxHeight =
                    null;

            }


            item.classList.toggle(
                "active"
            );


            const answer =
                item.querySelector(
                    ".faq-answer"
                );


            if (
                item.classList.contains(
                    "active"
                )
            ) {

                answer.style.maxHeight =
                    answer.scrollHeight +
                    "px";

            } else {

                answer.style.maxHeight =
                    null;

            }

        }
    );

});



// ========================================
// PRICING BUTTONS
// ========================================

const priceButtons =
    document.querySelectorAll(
        ".price-btn"
    );


priceButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const plan =
                button.dataset.plan;


            alert(
                `You selected the ${plan} plan.`
            );

        }
    );

});



// ========================================
// START APPLICATION
// ========================================

displayTasks();

updateStatistics();