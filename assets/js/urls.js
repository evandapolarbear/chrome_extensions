var urlInput = document.getElementById("url-input");
var urlSubmit = document.getElementById("url-submit");
var urlUl = document.getElementById("url-ul");
var displayUrl = document.getElementById("display-urls");
var openInput = document.getElementById("open-url-input");
var addUlrInput = document.getElementsByClassName("add-url").item(0)

openInput.addEventListener("click", e => {
  e.preventDefault();

  if (needsHackyFix()){
    var item = document.getElementsByClassName("add-url").item(0);
    item.classList.add("hacky-fix")
  }

  openInput.classList.add("hidden");
  addUlrInput.classList.remove("hidden");
});

function needsHackyFix(){
  var w=window, d=document, e=d.documentElement
  var width = w.innerWidth||e.clientWidth;
  var height = w.innerHeight||e.clientHeight;
  var noKids = urlUl.children.length === 0;

  console.log(urlUl.children);

  if (width > 750 && height > 610 && noKids){
    return true
  } else {
    return false;
  }
}

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


  addUlrInput.classList.add("hidden");
  openInput.classList.remove("hidden");

  var item = document.getElementsByClassName("add-url").item(0);
  item.classList.remove("hacky-fix")
}

function saveNewUrl(url){
  chrome.storage.local.get("urls", store => {

    if(store.urls === undefined || !Array.isArray(store.urls)){
      var toSave = store.urls = [url];
    } else {
      var toSave = store.urls
      toSave.push(url)
    }

    chrome.storage.local.set({"urls" :toSave});
  });
}

function addUrlToUl(url){
  displayUrl.classList.remove("hidden");

  var deleteButton = createUrlDeleteButton(url)
  var newLi = document.createElement("li");
  var outer = document.createElement("a");
    outer.setAttribute("href", url);
  var inner = document.createElement("div")
    inner.classList.add("url-li");
  var content = document.createTextNode(titleMaker(url))

  inner.appendChild(content);
  newLi.appendChild(deleteButton);
  outer.appendChild(inner);
  newLi.appendChild(outer)
  urlUl.appendChild(newLi);
}

function titleMaker(url){
  if (url.indexOf("www") !== -1){
    var firstIdx = url.indexOf(".") + 1;
  } else {
    var firstIdx = url.indexOf("/") + 2;
  }

  var secondIdx = url.slice(firstIdx).indexOf(".") + firstIdx;
  var title = url.slice(firstIdx, secondIdx)

  return title.slice(0,10);
}

function createUrlDeleteButton (url){
  var deleteButton = document.createElement("div");
    deleteButton.classList.add("url-delete");
    deleteButton.appendChild(document.createTextNode("X"))

  deleteButton.addEventListener("click", e => {
    e.preventDefault();

    chrome.storage.local.get("urls", store => {
      var urlList = store.urls;
      var idx = urlList.indexOf(url);

      var left = urlList.slice(0, idx);
      var right = urlList.slice(idx+1);

      var toSave = left.concat(right);

      chrome.storage.local.set({"urls": toSave}, initialUrlAdd)
    });
  });

  return deleteButton;
}

function initialUrlAdd() {
  urlUl.innerHTML = null;

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
