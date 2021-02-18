chrome.storage.sync.get({ tabBundleNameList: [] }, function (res) {
    if (res) {
        res.tabBundleNameList.forEach(function (name) {
            const sectionContainer = document.getElementById('section');
            const detailsContainer = document.createElement("details");
            const summaryElement = document.createElement("summary");
            const newText = document.createTextNode(name);
            sectionContainer.appendChild(detailsContainer);
            detailsContainer.appendChild(summaryElement);
            summaryElement.appendChild(newText);
            
            const formContainer = document.createElement("form");
            formContainer.id = name;
            detailsContainer.appendChild(formContainer);
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

                const submit = document.createElement("input");
                submit.setAttribute("type", "submit");
                submit.setAttribute("value", "Change Items");
                formContainer.appendChild(submit);
            });                
        });
    }
});

window.onload = function () {
    const forms = document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++) {
        forms[i].onsubmit = function () {
            const item = forms[i];
            //alert(item.id);
            const inputs = document.getElementsByClassName(item.id);
            let urlArr = [];
            for (let index = 0; index < inputs.length; index++){
                urlArr.push(inputs[index].value);
                alert(inputs[index].value);
            }

            let option = {}; option[item.id] = urlArr;
            chrome.storage.sync.set(option);
        };
    }
};