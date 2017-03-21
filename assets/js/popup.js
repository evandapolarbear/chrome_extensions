var popUl = document.getElementById("popup")

function taskAdd(){
  chrome.storage.local.get("taskList", store => {
    var tasks = store.taskList;

    if(tasks.length > 0) {
      tasks.forEach(t => {
        addToUl(t)
      })
    }

  });
}

function addToUl(task){
  var newLi = document.createElement("li");
  var content = document.createTextNode(task);

  newLi.appendChild(content);
  newLi.classList.add("pop-li")

  newLi.addEventListener("click", e => {
    e.preventDefault();

    deleteItem()
  });

  popUl.appendChild(newLi)
}

function deleteItem(task) {
  console.log("Yaaaaa");
}

taskAdd()
