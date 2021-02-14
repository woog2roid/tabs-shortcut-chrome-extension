chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "addTabBundle: content -> background") {
        console.log("addTabBundle: content -> background");
        
        const winID = sender.tab.windowId;
        if (winID) {
            chrome.tabs.getAllInWindow(winID, function (tabs) {
                console.log("----------------------------");
                tabs.forEach(function (tab) {
                    chrome.storage.local.set({url: tab.url}, function () {
                        console.log(tab.url);
                    });
                    sendResponse({ farewell: "finished: addTabBundle" });
                });
                console.log("----------------------------");
            });
        }
        else {
            console.log("No window ID...");
        }
    } 
});