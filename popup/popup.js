chrome.storage.local.get({ tabBundleNameList: [] }, function (res) {
    if (res) {
        res.tabBundleNameList.forEach(function (name) {
            const newElement = document.createElement("div");
            newElement.className = "opener hoverable";
            newElement.id = name;
            const newText = document.createTextNode(name);
            newElement.appendChild(newText);
            const container = document.getElementById("list-items");
            container.appendChild(newElement);
        });
    }
});

const callNameForm = document.getElementById("list-plus-img");
callNameForm.onclick = function callNameForm() {
    const nameForm = document.getElementById("list-plus");
    nameForm.style.display = "block";
};

const addTabBundle = document.getElementById("list-plus");
addTabBundle.onsubmit = function addTabBundle() {
    tabBundleName = document.getElementById("bundle-name-input").value; 
    //alert(tabBundleName);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "addTabBundle: popup -> content", tabBundleName: tabBundleName} );
    });
}

const openOptionPage = document.getElementById("setting");
openOptionPage.onclick = function openOptionPage() {
    window.open('../option/option.html', "PopupWin", "width=500,height=600"); 
};

window.onload = function () {
    const openTabs = document.getElementsByClassName("opener");
    for (let i = 0; i < openTabs.length; i++) {
        openTabs[i].onclick = function openTabs() {
            id = this.id;
            option = {}; option[id] = [];
            chrome.storage.local.get(option, function (urlsObject) {
                urls = urlsObject[id];
                urls.forEach(function (url) {
                    chrome.tabs.create({ url: url });
                });
            });
        }
    }
};