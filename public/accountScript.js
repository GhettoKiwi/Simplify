let clickedAccountId = "5dcbe0851d3c7d081c781a08"; // Test

async function findAccount() {
    const response = await fetch('/accounts');
    const accounts = await response.json();
    const foundAccount = accounts.find(account => account._id == clickedAccountId);
    return foundAccount;
};

async function setOnClick() {
    document.getElementById('#btnRemoveAccount').onclick = async () => {
        try {
            const foundAccount = await findAccount();
            const url = '/accounts/' + foundAccount._id;
            console.log(url);
            const res = await fetch(url, {
                method: "DELETE",
            })
            if (res.status >= 400 || !res) {
                throw new Error('Failed to fetch');
            }
            const json = await res.json();
            console.log('Result: %o', json);
        } catch (e) {
            console.log("Error: " + e);
        }
    };
};


setOnClick();