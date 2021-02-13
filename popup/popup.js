const addTabBundle = document.getElementById("list-title-plus");
addTabBundle.onclick = function addTabBundle() {
    chrome.runtime.sendMessage({action: "addTabBundle"}, function(response) {
        alert(response);
    });
};

const openOptionPage = document.getElementById("setting");
openOptionPage.onclick = function openOptionPage() {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    window.open('../option/option.html', "PopupWin", "width=500,height=600"); 
};