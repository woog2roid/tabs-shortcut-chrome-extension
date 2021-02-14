const addTabBundle = document.getElementById("list-title-plus");
addTabBundle.onclick = function addTabBundle() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "addTabBundle: popup -> content" });
    });
};

const openOptionPage = document.getElementById("setting");
openOptionPage.onclick = function openOptionPage() {
    window.open('../option/option.html', "PopupWin", "width=500,height=600"); 
};
