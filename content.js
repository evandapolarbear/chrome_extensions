var addTaskButton = document.getElementById("add-task-button");
var addTaskField = document.getElementById("new-task-field");
var taskList = document.getElementById("task-list");


document.addEventListener("keypress", e => {
  var key = e.which || e.keyCode;
  if (key === 13) {
    e.preventDefault();
    aggAddTask();
  }
})
addTaskButton.addEventListener("click", e => {
  e.preventDefault();
  aggAddTask();
});

function aggAddTask() {
  var newTask = addTaskField.value;

  if (newTask === '') {
    return
  }

  addTaskField.value = '';
  saveNewTask(newTask);
  addTaskToUl(newTask);
}

function addTaskToUl(task){
  var newLi = document.createElement("li");
  var content = document.createTextNode(task);
  newLi.appendChild(content);

  newLi.addEventListener("click", e => {
    e.preventDefault();

    toggleDelete(newLi)
  });

  taskList.appendChild(newLi);
}

function toggleDelete(li){
  var classes = li.classList;
  var task = li.textContent

  if (classes.contains("deleted")) {
    classes.remove("deleted");
    saveNewTask(task);
  } else{
    classes.add("deleted")
    removeFromStorage(task);
  }
}


function removeFromStorage(task) {
  chrome.storage.local.get("taskList", store => {
    var taskList = store.taskList;
    var idxToDel = taskList.indexOf(task);

    var left = taskList.slice(0, idxToDel);
    var right = taskList.slice(idxToDel + 1);

    var toSave = left.concat(right);

    chrome.storage.local.set({taskList: toSave});
  });
}

function saveNewTask(task) {
  chrome.storage.local.get("taskList", store => {

    if(store.taskList === undefined || !Array.isArray(store.taskList)){
      var toSave = store.taskList = [task];
    } else {
      var toSave = store.taskList
      toSave.push(task)
    }

    chrome.storage.local.set({"taskList": toSave});
  });
}

function initialTaskAdd(){
  chrome.storage.local.get("taskList", store => {
    var tasks = store.taskList;

    if(tasks.length > 0) {
      for (let i = 0; i < tasks.length; i++){
        addTaskToUl(tasks[i])
      }
    } else {
      taskList.classList.add("hidden")
    }
  });
}

initialTaskAdd();
