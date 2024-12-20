//declaring all HTMl elements
const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");
const addBtn = document.getElementById("addBtn");
const uncompletedTable = document.querySelector("#uncompletedTable tbody");
const completedTable = document.querySelector("#completedTable tbody");
const deleteAllBtn = document.getElementById("deleteAll");
const notification = document.getElementById("notification");
const titleError = document.querySelector(".error");

//creatimg tasks array to get all tasks from local storage, if there is no elements it will be empty.
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// console.log(typeof tasks, tasks);

//creating a function that takes tasks array and draw table rows for completed and not completed tasks with simple conditions.
function drawTable(tasks) {
  uncompletedTable.innerHTML = "";
  completedTable.innerHTML = "";
  tasks.forEach((task, index) => {
    if (!task.completed) {
      uncompletedTable.innerHTML += ` <tr class="effect">
              <td>${index + 1}</td>
              <td>${task.title}</td>
              <td>${task.priority}</td>
              <td class="actions">
                <button id="update" onclick="updateTask(${index})">Update</button>
                <button id="delete" onclick="deleteTask(${index})">Delete</button>
                <button id="completed" onclick="completeTask(${index})">Completed</button>
              </td>
            </tr>`;
    } else {
      completedTable.innerHTML += ` <tr class="effect">
              <td>${index + 1}</td>
              <td>${task.title}</td>
              <td>${task.priority}</td>
              <td><button id="delete" onclick="deleteTask(${index})">Delete</button></td>
             </tr>`;
    }
  });
}
//displayRows function => after every change i can call it to set the new tasks items to local storage and calling drawTable function to display rows. 
function displayRows() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  drawTable(tasks);
}
// function to make notification appears for 1 second.
function toggleNotification() {
  notification.classList.remove("hidden");
  notification.classList.add("shown");
  setTimeout(() => {
    notification.classList.add("hidden");
    notification.classList.remove("shown");
  }, 1000);
}
//After add button be clicked a new task object created takes the task title and priority if the task title isn't empty then it is pushed to tasks array (that is will stored in local storage).
//After set this value to local storage the input returns empty and the notification appears with successfully added content
addBtn.addEventListener("click", () => {
  let title = taskTitle.value.trim();
  let priority = taskPriority.value;
  if (title == "") {
    // alert("Please enter your task title");
    titleError.classList.remove("hidden");
  } else {
    titleError.classList.add("hidden");
    // setting the completed value of the task with false to be drawn in the uncompleted table
    let newTask = { title, priority, completed: false };
    tasks.push(newTask);
    displayRows();
    taskTitle.value = "";
    notification.innerHTML = "Successfully Added";
    toggleNotification();
  }
});
// delete all tasks with confirmation then drawing the tables with empty array.
deleteAllBtn.addEventListener("click", () => {
  if (tasks.length > 0) {
    if (confirm("Are you sure you want to delete all tasks?!")) {
      tasks = [];
      notification.innerHTML = "All Tasks Deleted Successfully";
      toggleNotification();
      displayRows();
    }
  } else {
    alert("There is no tasks to be deleted");
  }
});
//delete the selected task from the array then display rows.
function deleteTask(index) {
  tasks.splice(index, 1);
  notification.innerHTML = "Successfully Deleted";
  toggleNotification();
  displayRows();
}
//update the selected task title then display rows.
function updateTask(index) {
  const newTitle = prompt("Enter the new task title:", tasks[index].title);
  if (newTitle !== null) {
    tasks[index].title = newTitle.trim();
    notification.innerHTML = "Successfully Updated";
    toggleNotification();
    displayRows();
  }
}
//change the completed value of the task to true so that it will be drawn in the completed table.
function completeTask(index) {
  tasks[index].completed = true;
  notification.innerHTML = `Successfully Completed`;
  toggleNotification();
  displayRows();
}
document.addEventListener("DOMContentLoaded", displayRows);
