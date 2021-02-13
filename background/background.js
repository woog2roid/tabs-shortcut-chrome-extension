chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "addTabBundle") {
        console.log("addTabBundle");
    }
});