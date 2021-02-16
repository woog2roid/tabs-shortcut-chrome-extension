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
