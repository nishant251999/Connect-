const btn = document.querySelector(".btn");
btn.addEventListener("click", async ()=> {

    const queryOptions = {active: true, lastFocusedWindow: true};
    const [tab] = await chrome.tabs.query(queryOptions);

    const response = await chrome.tabs.sendMessage(tab.id, {
        btnClicked: true
    });
    // console.log(response);
    if(response) {
        document.querySelector(".counter p").textContent = `Total Connected : ${response.count}`;
    }
});