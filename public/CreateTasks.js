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

async function GET(url) {
    const OK = 200;
    let response = await fetch(url);
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


function today(){
    let myDate = document.getElementById('Deadline');
    let myToday = new Date();
    myDate.value = myToday;
}

async function CreateTasks() {
    let name = document.getElementById('Name').value;
    let description = document.getElementById('Description').value;
    let deadline = document.getElementById('Deadline').value;
    let departments = document.getElementById('departmentDrop');
    let departmentId = departments.options[departments.selectedIndex].dataset.depid;
    let task = {
        "name": name,
        "description": description,
        "deadline": deadline
    };

    try {
        
        
        
        // Test om alt er fuldt ud 
        
        if (name ==  null || name == ""){
            alert("Opgaven af ikke noget Navn")
            return false;
        } else if (description == null || description == ""){
            alert("Opgaven af ikke nogen Beskrivelse")
            return false;
        } else if (deadline == null || deadline == ""){
            alert("Opgaven af ikke nogen Tidsfrist")
            return false;
        }
        
        let createdTaskId = await POST('/tasks/', task);
        await PUT('/department/put/' + departmentId, {"tasks": createdTaskId});

    } catch (e) {
        console.log("Error: " + e);
    }
    document.getElementById('Name').value = "";
    document.getElementById('Description').value = "";
    document.getElementById('Deadline').value = "";
}

async function main() {
    let button = document.getElementById('btnCreateTask');
    button.onclick = CreateTasks
    let department = document.getElementById('departmentDrop');
    let departments = await GET('/department/');
    for (let d of departments) {
        let option = document.createElement('option');
        option.value = d.name;
        option.innerHTML = d.name;
        option.dataset.depid = d._id;
        department.appendChild(option);
    }
}

async function checkIFLoggedIn(){
    const loggedIn = await POST('/session/checkIfLoggedIn');
    const position = await POST('/session/accountPosition');
    console.log(loggedIn.ok);
    if(!loggedIn.ok){
        window.location.replace('/');
    }
    if(position.pos == "Vicevært"){
        window.location.replace('/web/notAllowed');
    } else {
        await main();
    }
};

checkIFLoggedIn();