let nameField = document.getElementById("Name");
let descriptionField = document.getElementById("Description")
let deadlineField = document.getElementById("Deadline");
let statusField = document.getElementById("statusChange");

let taskId = "";
let departmentid = "5dd6a64f2e877324bcd7dd4f";

async function generateTaskTable(task) {
    let template = await GETtext('/task.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({ task });
}

// function daysBetween(second) {
//     let first = new Date();
//     let dd = String(first.getDate()).padStart(2, '0');
//     let mm = String(first.getMonth() + 1).padStart(2, '0'); //January is 0!
//     let yyyy = first.getFullYear();

//     first = mm + '/' + dd + '/' + yyyy;
//     let one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
//     let two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

//     // Do the math.
//     let millisecondsPerDay = 1000 * 60 * 60 * 24;
//     let millisBetween = two.getTime() - one.getTime();
//     let days = millisBetween / millisecondsPerDay;
//     console.log(days);
//     // Round down.
//     return Math.floor(days);
// }

async function getTask(task) {
    taskId = task.dataset.customid;
    let taskDB = await GET('/tasks/' + taskId);
    nameField.value = taskDB.name;
    descriptionField.innerHTML = taskDB.description;
    let date = taskDB.deadline.slice(0, 10);
    deadlineField.value = date;
}

async function main() {
    await update();
    let btnEdit = document.getElementById("btnEditTask");
    btnEdit.onclick = updateTask;
    let btnDelete = document.getElementById("BtnDeleteTask");
    btnDelete.onclick = deleteTask;
}

async function updateTask() {
    let task = {
        "name": nameField.value,
        "description": descriptionField.value,
        "deadline": deadlineField.value,
        "status": statusField.value
    };
    try {
        await PUT('/tasks/update/' + taskId, task);
    } catch (e) {
        console.log("Error: " + e);
    }
    update();
}

async function deleteTask() {
    try {
        await DELETE('/tasks/' + taskId);
        await PUT('/department/remove/' + departmentid, { "tasks": taskId });
        nameField.value = "";
        descriptionField.value = "";
        deadlineField.value = null;
    } catch (e) {
        console.log("Error: " + e);
    }
    update();
}

async function update() {
    try {
        let department = await GET('/department/' + departmentid);
        let deptasks = department.tasks;
        let tasks = [];
        for (let t of deptasks) {
            tasks.push(await GET('/tasks/' + t));
        }
        let taskTable = document.getElementById('OverviewOverListView');
        taskTable.innerHTML = await generateTaskTable(tasks);
        let coll = document.getElementsByClassName("collapsible");
        for (let e of coll) {
            e.addEventListener("click", function () {
                e.classList.toggle("active");
                let content = e.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}

async function GETtext(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.text();
}

async function GET(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.json();
}

async function POST(url, data) {
    const OK = 200;
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.json();
}

async function PUT(url, data) {
    const OK = 200;
    let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.json();
}

async function DELETE(url, data) {
    const OK = 200;
    let response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.json();
}

// async function takeTask() {
//     let task = await GET('/' + taskId);
//     try {
//         await PUT('/tasks/responsible/' + taskId, task);
//     } catch (e) {
//         console.log("Error: " + e);
//     }
//     update();
// }

async function checkIFLoggedIn(){
    const loggedIn = await POST('/session/checkIfLoggedIn');
    console.log(loggedIn.ok);
    if(!loggedIn.ok){
        window.location.replace('/');
    } else {
        await main();
    }
};

checkIFLoggedIn();