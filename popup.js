const startBtn = document.querySelector(".btn button");
const counter = document.querySelector(".counter");
( async ()=> {
    const queryOptions = {active: true, lastFocusedWindow: true};
    const [tab] = await chrome.tabs.query(queryOptions);
    
    startBtn.addEventListener("click", async ()=> {
        const port = chrome.tabs.connect(tab.id, {
            name: "connect+"
        });
        startBtn.setAttribute("disabled", "true");
        startBtn.style.pointerEvents = "none";
        port.postMessage({
            start: true 
        });
        
        port.onMessage.addListener((msg)=> {
            counter.textContent = msg.count;
        });
    });
})();


