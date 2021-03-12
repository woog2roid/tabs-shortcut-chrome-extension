//initialize
chrome.storage.sync.get({ tabBundleNameList: [] }, function (res) {
    if (res) {
        res.tabBundleNameList.forEach(function (name) {
            const container = document.createElement("div");
            container.id = "list-grid-container";
            document.getElementById("list-items").appendChild(container);
    
            const newElement = document.createElement("div");
            newElement.className = "tab-opener hover-gray";
            newElement.id = name;
            const newText = document.createTextNode(name);
            newElement.appendChild(newText);
            container.appendChild(newElement);
    
            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", "../images/dash.svg");
            imgElement.className = "list-deleter-icon";
            container.appendChild(imgElement)
        });
    }
});

//add bundle
const callAdderForm = document.getElementById("list-adder-icon");
callAdderForm.onclick = function callAdderForm() {
    const nameForm = document.getElementById("adder-module");
    nameForm.style.display = "block";
};

const addTabBundle = document.getElementById("list-adder");
addTabBundle.onsubmit = function addTabBundle() {
    tabBundleName = document.getElementById("adder-module-input").value;
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        let index = 0;
        for (let i = 0; tabs.length; i++) {
            if (tabs[i].url.indexOf("http://") != -1 || tabs[i].url.indexOf("https://") != -1) { index = i; break; }
        }
        chrome.tabs.sendMessage(tabs[index].id, { action: "addTabBundle: popup -> content", tabBundleName: tabBundleName });
    });
};
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
        if (request.action == "call reload: content -> popup") location.reload();
});

//open details
const openOptionPage = document.getElementById("details");
openOptionPage.onclick = function openOptionPage() {
    window.open('../detail/detail.html', "PopupWin", "width=500,height=600"); 
};

window.onload = function () {
    const openTabs = document.getElementsByClassName("tab-opener");
    const deleteBundle = document.getElementsByClassName("list-deleter-icon");
    //open
    for (let i = 0; i < openTabs.length; i++) {
        openTabs[i].onclick = function openTabs() {
            id = this.id;
            option = {}; option[id] = [];
            chrome.storage.sync.get(option, function (urlsObject) {
                urls = urlsObject[id];
                urls.forEach(function (url) {
                    chrome.tabs.create({ url: url });
                });
            });
        }
    }
    //delete
    for (let i = 0; i < deleteBundle.length; i++) {
        deleteBundle[i].onclick = function () {
            chrome.storage.sync.get({ tabBundleNameList: [] }, function (res) {
                originalArray = res.tabBundleNameList;
                if (originalArray.length == 1) originalArray = [];
                else originalArray.splice(i, 1);
                chrome.storage.sync.set({ tabBundleNameList: originalArray }, function () {
                    try {
                        chrome.storage.sync.remove(openTabs[i].id, () => {
                            openTabs[i].parentNode.removeChild(openTabs[i]);
                            deleteBundle[i].parentNode.removeChild(deleteBundle[i]);
                        });
                    } catch (e) {
                        location.reload();
                    }
                });
            });
        }
    };
};