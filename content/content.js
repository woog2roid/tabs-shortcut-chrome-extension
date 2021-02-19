chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "addTabBundle: popup -> content") {
        console.log("addTabBundle: popup -> content: success");
        chrome.runtime.sendMessage({ action: "addTabBundle: content -> background", tabBundleName: msg.tabBundleName });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse({ farewell: "goodbye" });
});