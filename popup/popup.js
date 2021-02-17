
chrome.storage.local.get({ tabBundleNameList: [] }, function (res) {
    if (res) {
        res.tabBundleNameList.forEach(function (name) {
            const container = document.createElement("div");
            container.id = "list-grid-container";
            document.getElementById("list-items").appendChild(container);

            const newElement = document.createElement("div");
            newElement.className = "opener hoverable";
            newElement.id = name;
            const newText = document.createTextNode(name);
            newElement.appendChild(newText);
            container.appendChild(newElement);

            //'<img class = "deleter" src="../images/dash.svg" alt = " ">'
            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", "../images/dash.svg");//(속성명, 속성값)
            imgElement.className = "deleter";
            container.appendChild(imgElement);
        });
    }
});

const callNameForm = document.getElementById("list-plus-img");
callNameForm.onclick = function callNameForm() {
    const nameForm = document.getElementById("add-bundle");
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
    const deleteBundle = document.getElementsByClassName("deleter");

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

    for (let i = 0; i < deleteBundle.length; i++) {
        deleteBundle[i].onclick = function () {
            chrome.storage.local.get({ tabBundleNameList: [] }, function (res) {
                originalArray = res.tabBundleNameList;
                if (originalArray.length == 1) originalArray = [];
                else originalArray.splice(i, i);
                chrome.storage.local.set({ tabBundleNameList: originalArray }, function () {
                    openTabs[i].remove();
                    deleteBundle[i].remove();
                });
            });
            chrome.storage.local.remove(openTabs[i].id);
        };
    }
};