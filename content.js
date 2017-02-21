var addTaskButton = document.getElementById("add-task-button");
var addTaskField = document.getElementById("new-task-field");
var taskList = document.getElementById("task-list");




addTaskButton.addEventListener("click", e => {
  e.preventDefault()
  var newTask = addTaskField.value;
  saveNewTask(newTask);
  addTaskToUl(newTask);
});

function addTaskToUl(task){
  var newLi = document.createElement("li");
  var content = document.createTextNode(task);
  newLi.appendChild(content);
  taskList.appendChild(newLi);
}

function saveNewTask(task) {
  chrome.storage.local.get("taskList", store => {

    console.log(store);

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
    for (let i = 0; i < tasks.length; i++){
      addTaskToUl(tasks[i])
    }
  });
}

initialTaskAdd();
