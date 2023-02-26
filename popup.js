const btn = document.querySelector(".btn");
let counter = document.querySelector(".counter");
let btnState = true;
( async ()=> {
    const queryOptions = {active: true, lastFocusedWindow: true};
    const [tab] = await chrome.tabs.query(queryOptions);
    
    btn.addEventListener("click", async ()=> {
        const port = chrome.tabs.connect(tab.id, {
            name: "connect+"
        });
        if(btnState) {
            btnState = false;
            port.postMessage({
                start: true 
            });
        }

        port.onMessage.addListener((msg)=> {
            counter.textContent = msg.count;
        });
    });
})();


