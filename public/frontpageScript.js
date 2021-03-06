//----------- HTML elements -----------
const overviewDIV = document.querySelector('#overview');

//----------- API CALLS -----------
async function GET(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.json();
};

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
};

async function GETtext(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.text();
};
//----------- Setup & Autogenerated elements -----------
function statusTranslater(status){
    if (status == "OPEN") {
        return "Åben";
    } else if ('IN PROGRESS') {
        return "Igangværende";
    } else if ('DONE') {
        return "Færdig";
    } else if ('ON HOLD') {
        return 'På Hold';
    } else {
        return 'Godkendt';
    }
};
// generer table af tasks for taskOverview
async function generateTaskTable(task) {
    let template = await GETtext('/taskOverview.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({ task });
};
// generer funktionaliteten dropdown
async function collapibleSetup(){
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
};

//henter et array af de opgaver brugenen har taget
async function overviewForMySelf() {
    try{
        const tasks = await GET('/tasks');
        const sessionUsername = await POST('/session/username');
        const myName = sessionUsername.currentUser;
        let myTasks = [];
        for(let t of tasks) {
            if(t.responsible == myName){
                t.deadline = t.deadline.slice(0, 10);
                if (t.ETA !== null) {
                    t.ETA = t.ETA.slice(0, 10);
                }
                myTasks.push(t);
            };
        };
        overviewDIV.innerHTML = await generateTaskTable(myTasks);
        await collapibleSetup();
    } catch (e) {
        console.log("Error: " + e);
    }
};

async function headlineMaker(){
    try {
        const h1 = document.querySelector('#headlineFrontpage');
        const sessionUsername = await POST('/session/username');
        h1.innerHTML = "Oversigt for " + sessionUsername.currentUser;
    } catch (e){
        console.log(e);
    }
};

function x (){
    for (let t of tasks) {
        t.deadline = t.deadline.slice(0, 10);
        if (t.ETA !== null)
            t.ETA = t.ETA.slice(0, 10);
    }
};

//----------- Main and run -----------
async function main () {
    await headlineMaker();
    await overviewForMySelf();
};

async function checkIFLoggedIn(){
    const loggedIn = await POST('/session/checkIfLoggedIn');
    if(!loggedIn.ok){
        window.location.replace('/');
    } else {
        await main();
    }
};

checkIFLoggedIn();

