var addTaskButton = document.getElementById("add-task-button");
var addTaskField = document.getElementById("new-task-field");
var taskList = document.getElementById("task-list");
var moreTasks = document.getElementById("see-more-tasks");
var taskLis = document.getElementsByClassName("task-li");


moreTasks.addEventListener("click", e => {
  e.preventDefault();
  var text = taskList.firstChild.nextElementSibling.innerHTML;

  chrome.storage.local.get("taskList", obj => {
    var store = obj.taskList
    var currIdx = store.indexOf(text);
    var newIdx = currIdx + 7;

    if (newIdx > store.length - 1 ) {
      newIdx = 0;
    }

    var toShow = store.slice(newIdx, newIdx+7)

    while(taskLis.length > 0){
      taskList.removeChild(taskLis[0]);
    }

    toShow.forEach(task => {
      addTaskToUl(task);
    });
  });
})

addTaskField.addEventListener('input', () => {
  addTaskButton.classList.remove("invisible");

  if (addTaskField.value === ''){
    addTaskButton.classList.add("invisible");
  }
});

document.addEventListener("keypress", e => {
  var key = e.which || e.keyCode;
  if (key === 13) {
    e.preventDefault();
    aggAddTask();
    aggUrlSave();
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
  if(taskLis.length > 6) {
    moreTasks.classList.remove("hidden");
    return;
  }

  taskList.classList.remove("hidden");

  var newLi = document.createElement("li");
    newLi.classList.add("task-li");
  var content = document.createTextNode(task);

  newLi.appendChild(content);

  newLi.addEventListener("click", e => {
    e.preventDefault();

    toggleDelete(newLi)
  });

  taskList.insertBefore(newLi, moreTasks);
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
  totalNumTasks = 0;
  chrome.storage.local.get("taskList", store => {

    if(store.taskList === undefined || !Array.isArray(store.taskList)){
      var toSave = store.taskList = [task];
    } else {
      var toSave = store.taskList
      toSave.push(task)
    }

    totalNumTasks = toSave.length;
    chrome.storage.local.set({"taskList": toSave});
  });
  return totalNumTasks;
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
