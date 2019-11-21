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

async function getTask(task) {
    taskId = task.dataset.customid;
    console.log(taskId);
    let taskDB = await GET('/tasks/' + taskId);
    nameField.value = taskDB.name;
    descriptionField.innerHTML = taskDB.description;
    let date = taskDB.deadline.slice(0, -1);
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
        await PUT('/tasks/' + taskId, task);
    } catch (e) {
        console.log("Error: " + e);
    }
    update();
}

async function deleteTask() {
    try {
        await DELETE('/tasks/' + taskId);
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
        let department = await GET('/department/'+departmentid);
        let deptasks = department.tasks;
        let tasks = [];
        for (let t of deptasks) {
            tasks.push(await GET('/tasks/'+t));
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

main(); 