function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

chrome.runtime.onConnect.addListener( async (port) => {

    port.onMessage.addListener(async (msg) => {
        if(msg.start == true) {
            const Results = document.querySelectorAll(".entity-result__item");
            let i = 0;
            for(const res of Results) {
                const btn = res.querySelector(".artdeco-button");
                const btnText = btn.firstElementChild.textContent.trim();
                if(['Follow'].includes(btnText)) {
                    btn.click();
                    if(btnText == 'Connect') {
                        await sleep(500);
                        const HYDKModal = document.querySelector(".artdeco-modal");
                        const pillOption = document.querySelector(".artdeco-pill-choice-group")?.firstElementChild;
                        if(pillOption) {
                            pillOption?.click();
                            await sleep(500);
                            const modalCntBtn = HYDKModal.querySelectorAll(".artdeco-button")[1];
                            modalCntBtn?.click();
                            await sleep(500);
                        }
                        const modalSendBtn = document.querySelector(".artdeco-button.ml1");
                        modalSendBtn?.click();
                        console.log(modalSendBtn);
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
    })
});

