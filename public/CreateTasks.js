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

async function CreateTasks() {
    let name = document.getElementById('Name').value;
    let description = document.getElementById('Description').value;
    let deadline = document.getElementById('Deadline').value;
    let departments = document.getElementById('departmentDrop');
    let departmentId = departments.options[departments.selectedIndex].dataset.depid;

    console.log("DIS IS DE FUKIN DEPID: " + departmentId);
    let task = {
        "name": name,
        "description": description,
        "deadline": deadline
    };

    try {
        let createdTaskId = await POST('/tasks/', task);
        console.log(createdTaskId);
        await PUT('/department/' + departmentId, {"tasks": createdTaskId});
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
        console.log(option.dataset.depid);
        department.appendChild(option);
    }
}

main();