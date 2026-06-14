const input = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const emptyState = document.querySelector("#emptyState");

function updateEmptyState() {
  if (todoList.children.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

function addTodo() {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  const li = document.createElement("li");
  li.classList.add("todo-item");

  const span = document.createElement("span");
  span.classList.add("todo-text");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";

  span.addEventListener("click", function () {
    li.classList.toggle("done");
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateEmptyState();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  input.value = "";
  input.focus();
  updateEmptyState();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

updateEmptyState();
