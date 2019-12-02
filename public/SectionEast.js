const nameField = document.getElementById("Name");
const descriptionField = document.getElementById("Description")
const deadlineField = document.getElementById("Deadline");
const statusField = document.getElementById("statusChange");
const ETAField = document.getElementById("ETA");
const listChosen = document.getElementById("taskChoice");

let ActiveButton = null;
let ActiveTask = null;

let taskId = "";
const departmentid = "5dd54fac1ecfc1160cc62df1";

async function generateTaskTable(task) {
    let template = await GETtext('/task.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({ task });
}

function formatDate(Date) {
    return Date.trim(0, 9);
}

async function getTask(task) {
    taskId = task.dataset.customid;
    if (ActiveButton !== null) {
        ActiveButton.disabled = true;
    }
    ActiveButton = document.getElementById("but" + taskId);
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
    let rights = await POST('/session/accountPosition');

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
    } else if (deadlineField.value < ETAField.value) {
        alert("ETA er sat efter deadlinen")
    } else if (deadlineField.value < today) {
        alert("Deadline forsøges sættes før dags dato")
    } else if (ETAField.value < today && ETAField.value !== "") {
        alert("ETA forsøges sættes før dags dato")
    } else if (statusField.value === "CONFIRMED" && rights.pos !== "Ejendomsdirektør") {
        alert("Kun Ejendomsdirektøren kan endeligt færdigmelde en opgave")
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

async function overviewForMySelf() {
    try {
        const tasks = await GET('/tasks');
        console.log(tasks);
        const sessionUsername = await POST('/session/username');
        const myName = sessionUsername.currentUser;
        let myTasks = [];
        for (let t of tasks) {
            if (t.responsible == myName) {
                myTasks.push(t);
            };
        };
        overviewDIV.innerHTML = await generateTaskTable(myTasks);
    } catch (e) {
        console.log("Error: " + e);
    }
};

async function update() {
    try {
        let department = await GET('/department/' + departmentid);
        let deptasks = department.tasks;
        let tasks = [];
        const sessionUsername = await POST('/session/username');
        const myName = sessionUsername.currentUser;
        for (let t of deptasks) {
            let task = await GET('/tasks/' + t);
            if (listChosen.value === "MYTASKS") {
                if (task.responsible === myName) {
                    tasks.push(await GET('/tasks/' + t));
                }
            }
            else if (task.status === listChosen.value || listChosen.value === "ALL") {
                tasks.push(await GET('/tasks/' + t));
            }
        }
        let taskTable = document.getElementById('OverviewOverListView');
        for (let t of tasks){
            t.deadline = t.deadline.slice(0, 10);
        }
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