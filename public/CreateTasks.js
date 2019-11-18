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

async function CreateTasks() {
    let name = document.getElementById('Name').value;
    let description = document.getElementById('Description').value;
    let deadline = document.getElementById('Deadline').value;

    let task = {
        "name":name,
        "description":description,
        "deadline":deadline
    };

    try {
        await POST('/tasks/',task);
            name.innerHTML = "";
            description.innerHTML = "";
            deadline.innerHTML = "";
        } catch (e) {
        console.log("Nej " + e);
    }
    // document.getElementById('Name').innerHTML = "";
    // document.getElementById('Description').innerHTML = "";
    // document.getElementById('Deadline').innerHTML = "";
}

async function main() {
    let button = document.getElementById('btnCreateTask');
    button.onclick = CreateTasks
}

main();