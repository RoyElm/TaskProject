//getting the data that entered by the user and saving it
//activate when the user click on save task button
function saveTask() {
    //Using DOM manipulation to get form inputs
    const noteAreaBox = document.getElementById("noteAreaBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    //Taking from form inputs there values
    const noteArea = noteAreaBox.value;
    const date = dateBox.value;
    const time = timeBox.value;
    reWhiteSpace = new RegExp(/^\s+$/);
    // Check for white space
    if (noteArea === "" || reWhiteSpace.test(noteArea)) {
        alert("Please enter text");
        noteAreaBox.focus();
        return;
    }else if (date === "") {
        alert("Please enter date");
        dateBox.focus();
        return;
    }
    //Creating object of Form Task;
    const task = { noteArea, date, time }
    //Loading all tasks from local storage;
    const allTask = loadingTasks();
    //Add the new task into array 
    allTask.push(task);
    //Saving the array in Local storage
    const allTaskJson = JSON.stringify(allTask);
    localStorage.setItem("allTask", allTaskJson);
    //Displaying all tasks
    displayNewTask(allTask.length - 1);
    noteAreaBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    noteAreaBox.focus();
}
//activate when the page is load (used defer to read all proprieties)
function displayAllTasks() {
    //getting the Main div of all tasks from HTML
    const container = document.getElementById("container");
    //Loading all tasks from Local Storage
    const allTask = loadingTasks();
    container.innerHTML = "";
    //using another function to print all the tasks inside allTask array
    for (let i = 0; i < allTask.length; i++) {
        displayNewTask(i);
    }
}
//display the new task the user entered (adding one task only! per run!)
//also using that function to create all tasks at the begging of web load
function displayNewTask(i) {
    //Getting DOM Containers
    const container = document.getElementById("container");
    const allTask = loadingTasks();
    const containerTask = document.createElement("div");
    //Adding id to know which task to delete from Local Storage
    //gave just a index to specify remove from array
    containerTask.setAttribute("id", `${i}`);
    //Adding attributes
    //using this method to send all the container to modify it
    containerTask.setAttribute("onmouseenter", "showSvg(this)");
    containerTask.setAttribute("onmouseleave", "deleteSvg(this)");
    containerTask.setAttribute("class", "containerTask fade-in");
    //creating new elements to contain the task inside the Container
    const mainTask = document.createElement("div");
    const dateAndTime = document.createElement("div");
    //adding to them the attribute.
    mainTask.setAttribute("class", "mainTask");
    mainTask.innerHTML = `${allTask[i].noteArea}`;
    dateAndTime.setAttribute("class", "dateAndTime");
    dateAndTime.innerHTML = `${allTask[i].date} <br> ${allTask[i].time}`;
    //adding the new elements to the containers
    containerTask.appendChild(mainTask);
    containerTask.appendChild(dateAndTime);
    container.appendChild(containerTask);
}
//function to show Delete-button
function showSvg(task) {
    //BootStrap Element of svg to create X button
    const svg = `<svg width="22px" height="22px" viewBox="0 0 16 16" class="bi bi - x - svgClass square - fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" /></svg >`;
    //Creating a Div that will contain the svg
    const divButton = document.createElement("div");
    divButton.innerHTML = svg;
    divButton.setAttribute("id", "button");
    divButton.setAttribute("onclick", "deleteTask()");
    //Adding the divButton to specify task by using "this" method
    task.appendChild(divButton);
}
//function to delete Delete-button
function deleteSvg(task) {
    const button = document.getElementById("button");
    (task.contains(button)) ? button.remove() : "";
}
//function to delete the task from screen and from Local storage
function deleteTask() {
    //question to the user if he sure to delete the task
    if (confirm('Delete the task?')) {
        event.currentTarget.parentElement.remove();
        //getting the specify index from task the id is single number
        const index = event.currentTarget.parentElement.id;
        //loading tasks to delete the task from array
        const allTask = loadingTasks();
        allTask.splice(index, 1)
        //adding the modified tasks
        const allTaskJson = JSON.stringify(allTask);
        localStorage.setItem("allTask", allTaskJson);
        //clearing the storage 
        //if the user don't have more tasks in storage
        if (allTask.length < 1) {
            localStorage.clear();
        }
        const containerTask = document.getElementsByClassName("containerTask");
        for (let i = 0; i < containerTask.length; i++) {
            containerTask[i].setAttribute("id", `${i}`);
        }

    }
}
//function to load tasks from local storage
function loadingTasks() {
    let allTaskArray = [];
    let allTaskJson = localStorage.getItem("allTask");
    if (allTaskJson != null) {
        allTaskArray = JSON.parse(allTaskJson);
    }
    return allTaskArray;
}
//calling the displayAllTasks to display the task at the begging of loading site
displayAllTasks();