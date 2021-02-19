chrome.storage.sync.get({ tabBundleNameList: [] }, function (res) {
    if (res) {
        res.tabBundleNameList.forEach(function (name) {
            /*
            nodes = document.getElementById("list-items").childNodes;
            for (let i = 0; i < nodes.length; i++) {
                document.getElementById("list-items").removeChild(nodes[i]);
            }
            */
            const container = document.createElement("div");
            container.id = "list-grid-container";
            document.getElementById("list-items").appendChild(container);
    
            const newElement = document.createElement("div");
            newElement.className = "opener hoverable";
            newElement.id = name;
            const newText = document.createTextNode(name);
            newElement.appendChild(newText);
            container.appendChild(newElement);
    
            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", "../images/dash.svg");//(속성명, 속성값)
            imgElement.className = "deleter";
            container.appendChild(imgElement)
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
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        let index = 0;
        for (let i = 0; tabs.length; i++) {
            if (tabs[i].url.indexOf("http://") != -1 || tabs[i].url.indexOf("https://") != -1) { index = i; break; }
        }
        chrome.tabs.sendMessage(tabs[index].id, { action: "addTabBundle: popup -> content", tabBundleName: tabBundleName }, function(response) {
            console.log(response.farewell);
            location.reload();
        });
    });
};

const openOptionPage = document.getElementById("bundle-detail");
openOptionPage.onclick = function openOptionPage() {
    window.open('../detail/detail.html', "PopupWin", "width=500,height=600"); 
};

window.onload = function () {
    const openTabs = document.getElementsByClassName("opener");
    const deleteBundle = document.getElementsByClassName("deleter");

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

    for (let i = 0; i < deleteBundle.length; i++) {
        deleteBundle[i].onclick = function () {
            chrome.storage.sync.get({ tabBundleNameList: [] }, function (res) {
                originalArray = res.tabBundleNameList;
                if (originalArray.length == 1) originalArray = [];
                else originalArray.splice(i, i);
                chrome.storage.sync.set({ tabBundleNameList: originalArray }, function () {
                    try {
                        chrome.storage.sync.remove(openTabs[i].id, () => {
                            setTimeout(() => {
                                openTabs[i].parentNode.removeChild(openTabs[i]);
                                deleteBundle[i].parentNode.removeChild(deleteBundle[i]);
                            }, 30);
                        });
                    } catch (e) {
                        location.reload();
                    }
                });
            });
        }
    };
};