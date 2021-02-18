chrome.runtime.onMessage.addListener(function (msg, sender) {
    if (msg.action === "addTabBundle: content -> background") {
        const winID = sender.tab.windowId;
        if (winID) {
            chrome.storage.sync.get({ tabBundleNameList: [] }, function (res) {
                if (res) {
                    res.tabBundleNameList.push(msg.tabBundleName);
                    chrome.storage.sync.set({ tabBundleNameList: res.tabBundleNameList }, function () {
                        console.log("addTabBundle: Below is state changes of chrome.storage: nameList and urlList");
                        console.log(res.tabBundleNameList);
                    });
                }
            });         
            let setUrls = {};
            setUrls[msg.tabBundleName] = [];
            chrome.tabs.getAllInWindow(winID, function (tabs) {
                tabs.forEach(function (tab) {
                    setUrls[msg.tabBundleName].push(tab.url);
                });
                chrome.storage.sync.set(setUrls, function () {
                    //to see console easily
                    setTimeout(function () { console.log(setUrls); }, 10);
                });
            });
        }
        else {
            console.log("No window ID...");
        }
    }
});