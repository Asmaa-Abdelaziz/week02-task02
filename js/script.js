//declaring all HTMl elements
const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");
const addBtn = document.getElementById("addBtn");
const uncompletedTable = document.querySelector("#uncompletedTable tbody");
const completedTable = document.querySelector("#completedTable tbody");
const deleteAllBtn = document.getElementById("deleteAll");
const notification = document.getElementById("notification");
const titleError = document.querySelector(".error");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// console.log(typeof tasks, tasks);
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
function displayRows() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  drawTable(tasks);
}
function toggleNotification() {
  notification.classList.remove("hidden");
  notification.classList.add("shown");
  setTimeout(() => {
    notification.classList.add("hidden");
    notification.classList.remove("shown");
  }, 1000);
}
addBtn.addEventListener("click", () => {
  let title = taskTitle.value.trim();
  let priority = taskPriority.value;
  if (title == "") {
    // alert("Please enter your task title");
    titleError.classList.remove("hidden");
  } else {
    titleError.classList.add("hidden");
    let newTask = { title, priority, completed: false };
    tasks.push(newTask);
    displayRows();
    taskTitle.value = "";
    notification.innerHTML = "Successfully Added";
    toggleNotification();
  }
});
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

function deleteTask(index) {
  tasks.splice(index, 1);
  notification.innerHTML = "Successfully Deleted";
  toggleNotification();
  displayRows();
}
function updateTask(index) {
  const newTitle = prompt("Enter the new task title:", tasks[index].title);
  if (newTitle !== null) {
    tasks[index].title = newTitle.trim();
    notification.innerHTML = "Successfully Updated";
    toggleNotification();
    displayRows();
  }
}

function completeTask(index) {
  tasks[index].completed = true;
  notification.innerHTML = `Successfully Completed`;
  toggleNotification();
  displayRows();
}
document.addEventListener("DOMContentLoaded", displayRows);
