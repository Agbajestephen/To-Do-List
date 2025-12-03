const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { id: Date.now(), text: taskText };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  renderTasks();
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${task.text}</span>
    <button onclick="editTask(${task.id})">Edit</button>
    <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function editTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return;

  const newText = prompt("Edit task:", task.text);
  if (newText === null || newText.trim() === "") return;

  task.text = newText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  loadTasks();
}

// function escapeHtml(text) {
//   const div = document.createElement('div');
//   div.textContent = text;
//   return div.innerHTML;
// }
