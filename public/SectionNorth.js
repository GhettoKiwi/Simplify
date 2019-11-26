const nameField = document.getElementById("Name");
const descriptionField = document.getElementById("Description")
const deadlineField = document.getElementById("Deadline");
const statusField = document.getElementById("statusChange");
const ETAField = document.getElementById("ETA");
const listChosen = document.getElementById("taskChoice");

let ActiveButton = null;

let taskId = "";
const departmentid = "5dd6a64f2e877324bcd7dd4f";

async function generateTaskTable(task) {
    let template = await GETtext('/task.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({ task });
}

function daysBetween(second) {
    let first = new Date();
    let dd = String(first.getDate()).padStart(2, '0');
    let mm = String(first.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = first.getFullYear();

    first = mm + '/' + dd + '/' + yyyy;
    let one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    let two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

    // Do the math.
    let millisecondsPerDay = 1000 * 60 * 60 * 24;
    let millisBetween = two.getTime() - one.getTime();
    let days = millisBetween / millisecondsPerDay;
    console.log(days);
    // Round down.
    return Math.floor(days);
}

async function getTask(task) {
    taskId = task.dataset.customid;
    if (ActiveButton !== null) {
        ActiveButton.disabled = true;
    }
    ActiveButton = document.getElementById(taskId);
    ActiveButton.disabled = false;
    let taskDB = await GET('/tasks/' + taskId);
    nameField.value = taskDB.name;
    descriptionField.innerHTML = taskDB.description;
    let date1 = taskDB.deadline.slice(0, 10);
    deadlineField.value = date1;
    statusField.value = taskDB.status;
    if (taskDB.ETA !== null) {
        let date2 = taskDB.ETA.slice(0, 10);
        ETAField.value = date2;
    }
}

async function main() {
    await update();
    let btnEdit = document.getElementById("btnEditTask");
    btnEdit.onclick = updateTask;
    let btnDelete = document.getElementById("BtnDeleteTask");
    btnDelete.onclick = deleteTask;
    let list = document.getElementById("taskChoice")
    list.onchange = update;
}

async function updateTask() {
    let responsible = await GET("/tasks/" + taskId);

    // Dags dato opsætning
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    if (nameField.value == null || nameField.value == "") {
        alert("Opgaven har ikke noget navn")
    } else if (descriptionField.value == null || descriptionField.value == "") {
        alert("Opgaven har ikke nogen beskrivelse")
    } else if (deadlineField.value == null || deadlineField.value == "") {
        alert("Opgaven har ikke nogen tidsfrist")
    }
    else if (deadlineField.value < ETAField.value) {
        alert("ETA er sat efter deadlinen")
    }
    else if (deadlineField.value < today) {
        alert("Deadline forsøges sættes før dags dato")
    }
    else if (ETAField.value < today) {
        alert("ETA forsøges sættes før dags dato")
    }
    else {
        let task = {
            "name": nameField.value,
            "description": descriptionField.value,
            "deadline": deadlineField.value,
            "status": statusField.value,
            "responsible": responsible.responsible,
            "ETA": ETAField.value
        };
        try {
            await PUT('/tasks/update/' + taskId, task);
        } catch (e) {
            console.log("Error: " + e);
        }
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
        ETAField.value = null;
    } catch (e) {
        console.log("Error: " + e);
    }
    update();
}

async function addComment() {
    let comment = document.getElementById("com" + taskId);
    await PUT('/tasks/addComment/' + taskId, { "Comments": comment.value });
    comment.value = "";
    update();
}

async function update() {
    try {
        let department = await GET('/department/' + departmentid);
        let deptasks = department.tasks;
        let tasks = [];
        for (let t of deptasks) {
            let task = await GET('/tasks/' + t);
            console.log(task);
            if (task.status === listChosen.value || listChosen.value === "ALL") {
                tasks.push(await GET('/tasks/' + t));
            }
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

async function takeTask() {
    let task = await GET("/tasks/" + taskId);
    try {
        await PUT('/tasks/responsible/' + taskId, task);
    } catch (e) {
        console.log("Error: " + e);
    }
    update();
}

async function checkIFLoggedIn() {
    const loggedIn = await POST('/session/checkIfLoggedIn');
    console.log(loggedIn.ok);
    if (!loggedIn.ok) {
        window.location.replace('/');
    } else {
        await main();
    }
};

checkIFLoggedIn();