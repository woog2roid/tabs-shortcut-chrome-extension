chrome.storage.sync.get({ tabBundleNameList: [] }, function (res) {
    if (res) {
        res.tabBundleNameList.forEach(function (name) {
            const sectionContainer = document.getElementById('section');
            const detailsContainer = document.createElement("details");
            const summaryElement = document.createElement("summary");
            summaryElement.id = name;
            const newText = document.createTextNode(name);
            sectionContainer.appendChild(detailsContainer);
            detailsContainer.appendChild(summaryElement);
            summaryElement.appendChild(newText);
            
            option = {}; option[name] = [];
            chrome.storage.sync.get(option, function (urlsObject) {
                urls = urlsObject[name];
                urls.forEach(function (url) {
                    let tabsList = document.createElement("li");
                    let urlString = document.createTextNode(url);
                    tabsList.appendChild(urlString);
                    detailsContainer.appendChild(tabsList)
                }) 
            });                
        });
    }
});

