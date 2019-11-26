//----------- HTML elements -----------
const btnEast = document.querySelector('#btnEast');
const btnCentrum = document.querySelector('#btnCentrum');
const btnNorth = document.querySelector('#btnNorth');
const btnMySelf = document.querySelector('#btnMySelf');
const overviewDIV = document.querySelector('#overview');
const centrumID = "5dd54fac1ecfc1160cc62df2";
const eastID = "5dd54fac1ecfc1160cc62df1";
const northID = "5dd6a64f2e877324bcd7dd4f";

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
//----------- Methods -----------
async function generateTaskTable(task) {
    let template = await GETtext('/taskOverview.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({ task });
};


async function overviewForMySelf() {
    try{
        const tasks = await GET('/tasks');
        console.log(tasks);
        const sessionUsername = await POST('/session/username');
        const myName = sessionUsername.currentUser;
        let myTasks = [];
        for(let t of tasks) {
            if(t.responsible == myName){
                myTasks.push(t);
            };
        };
        overviewDIV.innerHTML = await generateTaskTable(myTasks);
    } catch (e) {
        console.log("Error: " + e);
    }
};

async function overviewForDepartment(departmentID) {
    try {
        const department = await GET('/department/' + departmentID);
        const departmentTasks = department.tasks;
        let tasks = [];
        for (let t of departmentTasks) {
            tasks.push(await GET('/tasks/' + t));
        }
        overviewDIV.innerHTML = await generateTaskTable(tasks);
    } catch (e) {
        console.log("Error: " + e);
    }
};

async function setOnClicks() {
    btnEast.onclick = async function () {
        await overviewForDepartment(eastID);
    };
    btnNorth.onclick = async function () {
        await overviewForDepartment(northID);
    };
    btnCentrum.onclick = async function () {
        await overviewForDepartment(centrumID);
    };
    btnMySelf.onclick = async function () {
        await overviewForMySelf();
    };
}

//----------- Main and run -----------
async function main () {
    // Set overskrift ?!?
    await overviewForMySelf();
    await setOnClicks();
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

