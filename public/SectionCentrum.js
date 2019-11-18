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

async function main() {
    try {
        update();
    } catch (e) {
        console.log(e.name + ": " + e.message)
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

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

main();