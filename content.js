function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        const Results = document.querySelectorAll(".entity-result__item");

        let i = 0;
        for(const res of Results) {
            console.log(res);
            const btn = res.querySelector(".artdeco-button");
            const btnText = btn.firstElementChild.textContent.trim();
            if(['Follow', 'Connect'].includes(btnText)) {
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
                await sleep(3000);
                i++;
            }
        }

        sendResponse({
            count: i
        });
        console.log("finished", i);
    }
)

