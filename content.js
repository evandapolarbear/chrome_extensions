var addTaskButton = document.getElementById("add-task-button");
var addTaskField = document.getElementById("new-task-field");


addTaskButton.addEventListener("click", e => {
  e.preventDefault()
  var newTask = addTaskField.value;
  saveNewTask(newTask);
});

function saveNewTask(task) {
  var success = null;
  chrome.storage.local.get("taskList", store => {

    if(store.taskList === undefined || !Array.isArray(store.taskList)){
      var toSave = store.taskList = [task];
    } else {
      var toSave = store.taskList
      toSave.push(task)
    }

    chrome.storage.local.set({"taskList": toSave});
  });

  console.log("success flag:" + success);

  if (success === true) {
    return true;
  } else {
    return false;
  }

}
