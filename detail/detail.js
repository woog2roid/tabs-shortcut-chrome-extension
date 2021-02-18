chrome.storage.sync.get({ tabBundleNameList: [] }, function (res) {
    if (res) {
        res.tabBundleNameList.forEach(function (name) {
            const sectionContainer = document.getElementById('section');
            const detailsContainer = document.createElement("details");
            const summaryElement = document.createElement("summary");
            
            const TextCon = document.createElement("div");
            const newText = document.createTextNode(name);
            TextCon.appendChild(newText);
            
            sectionContainer.appendChild(detailsContainer);
            detailsContainer.appendChild(summaryElement);
            summaryElement.appendChild(newText);
            
            const formContainer = document.createElement("form");
            formContainer.id = name;
            detailsContainer.appendChild(formContainer);
            
            const addButton = document.createElement("img");
            addButton.setAttribute("src", "../images/plus.svg");
            addButton.className = "listAdder hoverable";
            addButton.id = name + "button";
            formContainer.appendChild(addButton);

            const submit = document.createElement("input");
            submit.setAttribute("type", "submit");
            submit.setAttribute("value", "Submit Changes");
            submit.className = "submit";
            formContainer.appendChild(submit);

            option = {}; option[name] = [];
            chrome.storage.sync.get(option, function (urlsObject) {
                urls = urlsObject[name];
                urls.forEach(function (url) {
                    const liContainer = document.createElement("li");
                    formContainer.appendChild(liContainer);
                    let tabsList = document.createElement("input");
                    tabsList.className = name;
                    tabsList.setAttribute("value", url);
                    tabsList.setAttribute("size", 60);
                    liContainer.appendChild(tabsList);
                })

            });             
        });
    }
});

window.onload = function () {
    const forms = document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++) {
        forms[i].onsubmit = function () {
            //alert("submit");
            const item = forms[i];
            
            
            const inputs = document.getElementsByClassName(item.id);
            let urlArr = [];
            let isFormatted = true;
            for (let index = 0; index < inputs.length; index++){
                //alert(inputs[index].value);
                if (inputs[index].value.length == 0) continue;
                if (inputs[index].value.indexOf("http://") == -1 && inputs[index].value.indexOf("https://") == -1) {
                    isFormatted = false;
                    inputs[index].value = "https://" + inputs[index].value; 
                }
                urlArr.push(inputs[index].value);
            }

            if (!isFormatted) {
                alert("Fully-qualified URLs must include a scheme. \n(i.e., 'http://www.google.com', not 'www.google.com'.)");
            }

            let option = {}; option[item.id] = urlArr;
            chrome.storage.sync.set(option, function () {
                location.reload();
            });
        };
    }

    const listAdders = document.getElementsByClassName("listAdder");
    for (let i = 0; i < listAdders.length; i++) {
        listAdders[i].onclick = function () {
            let id = listAdders[i].id.substring(0, (listAdders[i].id.length) - 6);
            //alert(id);

            formCon = document.getElementById(id);
            const liContainer = document.createElement("li");
            formCon.appendChild(liContainer);
            let tabsList = document.createElement("input");
            tabsList.className = id;
            tabsList.setAttribute("size", 60);
            liContainer.appendChild(tabsList);
        };
    }
};