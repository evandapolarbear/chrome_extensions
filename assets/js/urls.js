var urlInput = document.getElementById("url-input");
var urlSubmit = document.getElementById("url-submit");
var urlUl = document.getElementById("url-ul");
var displayUrl = document.getElementById("display-url");

urlSubmit.addEventListener("click", e => {
  e.preventDefault()
  aggUrlSave();
});

function aggUrlSave() {
  var newUrl = urlInput.value;

  if (newUrl === ''){
    return
  }

  urlInput.value = '';
  saveNewUrl(newUrl);
  addUrlToUl(newUrl);
}

function saveNewUrl(url){
  chrome.storage.local.get("urls", store => {
    if(store.url === undefined || !Array.isArray(store.urls)){
      var toSave = store.urls = [url];
    } else {
      var toSave = store.urls
      toSave.push(url)
    }

    chrome.storage.local.set({"urls" :toSave});
  });
}

function addUrlToUl(url){
  var newLi = document.createElement("li");
  newLi.classList.add("url-li");

  var inner = document.createElement("a");
  inner.setAttribute("href", url);
  inner.classList.add("url-a");

  var content = document.createTextNode(url)
  inner.appendChild(content);

  newLi.appendChild(inner);
}

function initialUrlAdd() {
  chrome.storage.local.get("urls", store => {
    var urls = store.urls;


    if (urls !== undefined && urls.length > 0){
      for (let i = 0; i < urls.length; i++){
        displayUrl.classList.remove("hidden")
        addUrlToUl(urls[i])
      }
    }
  });
}

initialUrlAdd();
