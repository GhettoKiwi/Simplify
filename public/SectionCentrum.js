let nameField = document.getElementById("NameCentrum");
let descriptionField = document.getElementById("DescriptionCentrum")
let deadlineField = document.getElementById("DeadlineCentrum");

let taskId = "";

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
    let btnEdit = document.getElementById("btnEditTaskCentrum");
    btnEdit.onclick = updateTask();
    let btnDelete = document.getElementById("BtnDeleteTaskCentrum");
    btnDelete.onclick = deleteTask();
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
}

async function updateTask() {
    let task = {
        "name":nameField.value,
        "description":descriptionField.innerHTML,
        "deadline":deadlineField.value
    };
    try {
        await PUT('/tasks/'+taskId,task);
        udpate();
        } catch (e) {
        console.log("Nej " + e);
    }
}

async function deleteTask() {
    try {
        await DELETE('/tasks/'+taskId,task);
            nameField.value = "";
            descriptionField.innerHTML = "";
            deadlineField.value = null;
            update();
        } catch (e) {
        console.log("Nej " + e);
    }
}
}

async function update() {
    try {
        let tasks = await GET('/tasks/')
        let taskTable = document.getElementById('OverviewOverListViewCentrum');
        taskTable.innerHTML = await generateTaskTable(tasks);
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