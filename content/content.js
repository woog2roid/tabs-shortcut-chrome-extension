chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "addTabBundle: popup -> content") {
        console.log("addTabBundle: popup -> content: success");

        chrome.runtime.sendMessage({ action: "addTabBundle: content -> background" }, function (response) {
            console.log(response);
        });
    }
});