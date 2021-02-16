chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "addTabBundle: content -> background") {
        console.log("addTabBundle: Below is the window's url list and bundle name");
        console.log(msg.bundleName);
        const winID = sender.tab.windowId;
        if (winID) {
            chrome.tabs.getAllInWindow(winID, function (tabs) {
                console.log("----------------------------");
                tabs.forEach(function (tab) {
                    chrome.storage.local.set({bundleName: msg.bundleName, url: tab.url}, function () {
                        console.log(msg.bundleName, tab.url);
                    });
                });
                setTimeout(function () { console.log("----------------------------") }, 10);
            });
        }
        else {
            console.log("No window ID...");
        }
    } 
});