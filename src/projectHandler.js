import * as storage from "./localStorage.js";
import taskFacilitator from "./addTask.js";
// Selecting Home Options
function resetSelection(options) {
    options.forEach((element) => {
        if (element.classList.contains("selected")) {
            element.classList.toggle("selected");
        }
    });
}
function selectHome() {
    let homeOptions = Array.from(document.querySelector(".home-options").children);
    homeOptions.shift();
    homeOptions.forEach((element, index, array) => {
        element.addEventListener('click', () => {
            const currentProject = document.querySelector(".project-title");
            currentProject.textContent = element.textContent;
            resetSelection(array);
            element.classList.toggle("selected");
            switch (element.textContent) {
                case "All":
                    taskFacilitator.removeAllTasks();
                    console.log(storage.getAllTasks());
                    break;
                case "Today":
                    taskFacilitator.removeAllTasks();
                    console.log(storage.getTodayTasks())
                    break;
                case "Week":
                    taskFacilitator.removeAllTasks();
                    console.log(storage.getWeekTask())
                    break;
                case "Completed":
                    taskFacilitator.removeAllTasks();
                    console.log(storage.getCompletedTasks())
                    break;
                default:
                    console.log("bruh")
                    break;
            }
        });
    });
}

// creating a project
const createProject = () => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("create-project");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    const add = document.createElement("div");
    add.textContent = "Add";
    const cancel = document.createElement("div");
    cancel.textContent = "Cancel";
    newDiv.appendChild(input);
    newDiv.appendChild(add);
    newDiv.appendChild(cancel);
    return { newDiv, add, cancel, input }
}
// cancel project
function cancelProject(newProject) {
    newProject.remove();
}
//add project
function addProject(projects, input) {

    // adds project to storage
    if (storage.projects.getItem(input)) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("option")
        let projectName = input;
        newDiv.textContent = projectName;
        const removeOption = document.createElement("div")
        removeOption.classList.add("remove-option")
        newDiv.addEventListener('click', () => {
            const currentProject = document.querySelector(".project-title");
            currentProject.textContent = newDiv.textContent;
        });
        removeOption.addEventListener('click', (event) => {
            event.stopPropagation();
            const currentProject = document.querySelector(".project-title");
        });
        newDiv.appendChild(removeOption);
        projects.appendChild(newDiv);
    }
    else {
        const newDiv = document.createElement("div");
        newDiv.classList.add("option")
        let projectName = input;
        newDiv.textContent = projectName;
        storage.newProject(input);
        const removeOption = document.createElement("div")
        removeOption.classList.add("remove-option")
        newDiv.addEventListener('click', () => {
            const currentProject = document.querySelector(".project-title");
            currentProject.textContent = newDiv.textContent;
        });
        removeOption.addEventListener('click', (event) => {
            event.stopPropagation();
            const currentProject = document.querySelector(".project-title");
        });
        newDiv.appendChild(removeOption);
        projects.appendChild(newDiv);
    }
}

export { selectHome, createProject, addProject, cancelProject };