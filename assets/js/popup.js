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

    deleteItem(task)
    newLi.classList.add("deleted")
  });

  popUl.appendChild(newLi)
}

function deleteItem(task) {
  chrome.storage.local.get("taskList", store => {
    var taskList = store.taskList;
    var idx = taskList.indexOf(task);

    var left = taskList.slice(0, idx);
    var right = taskList.slice(idx + 1);

    var toSave = left.concat(right);

    chrome.storage.local.set({taskList:toSave});
  });
}

taskAdd()
