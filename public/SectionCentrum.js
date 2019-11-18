let nameField = document.getElementById("NameCentrum");
let descriptionField = document.getElementById("DescriptionCentrum")
let deadlineField = document.getElementById("DeadlineCentrum");

let taskId = "";

async function GETtext(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.text();
}

async function generateTaskTable(task) {
    let template = await GETtext('/task.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({ task });
}

async function getTask(task) {
    taskId = task.dataset.customid;
    console.log(taskId);
    let taskDB = await GET('/tasks/'+taskId);
    nameField.value = taskDB.name;
    descriptionField.innerHTML = taskDB.description;
    let date = taskDB.deadline.slice(0, -1);
    deadlineField.value = date;
}

async function main() {
    await update();
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

async function GET(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.json();
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

main();