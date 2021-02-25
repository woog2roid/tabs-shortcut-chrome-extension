chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "addTabBundle: popup -> content") {
        console.log("addTabBundle: popup -> content: success");
        chrome.runtime.sendMessage({ action: "addTabBundle: content -> background", tabBundleName: msg.tabBundleName }, (response) => {
            console.log(response);
            callPopupReload();
        });
    }
});

function callPopupReload() {
    chrome.runtime.sendMessage({ action: "call reload: content -> popup" });
}