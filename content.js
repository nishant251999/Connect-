function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

chrome.runtime.onConnect.addListener( async (port) => {
    port.onMessage.addListener(async (msg) => {
        if(msg.start == true) {
            startClicking(port);
        }
    })
});

async function startClicking(port) {
    const results = document.querySelectorAll(".entity-result__item");
    let i = 0;
    for(const res of results) {
        const btn = res.querySelector(".artdeco-button");
        const btnText = btn.firstElementChild.textContent.trim();
        if(['Connect', 'Follow'].includes(btnText)) {
            btn.click();
            await sleep(500);
            if(btnText == 'Connect') {
                //To handle "How do you know each other modal"
                const HYDKModal = document.querySelector(".artdeco-modal");
                const pillOption = document.querySelector(".artdeco-pill-choice-group")?.firstElementChild;
                if(pillOption) {
                    pillOption?.click();
                    await sleep(500);
                    const modalCntBtn = HYDKModal.querySelectorAll(".artdeco-button")[1];
                    modalCntBtn?.click();
                    await sleep(500);
                }

                //To handle "Add Note modal"
                const modalSendBtn = document.querySelector(".artdeco-button.ml1");
                modalSendBtn?.click();
            }
            i++;
            port.postMessage({
                count: i
            });
            console.log("clicked", i);
            await sleep(3000);
        }
    }
}

