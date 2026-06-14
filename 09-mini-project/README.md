# Lesson 9: Mini Project — To-Do List

Now let's build a complete To-Do List application using everything you've learned. This project covers selecting elements, creating/removing elements, handling events, working with classes, and traversing the DOM.

---

## What We're Building

A fully functional to-do list where you can:
- Add new tasks
- Mark tasks as complete
- Delete tasks
- See a live character counter

---

## Project Structure

```
09-mini-project/
├── index.html    ← The HTML structure
├── app.js        ← The JavaScript logic
└── README.md     ← This file
```

---

## Step 1: The HTML

Open `index.html` and study the structure:

- An input field for typing new tasks
- An "Add" button
- An unordered list where tasks will appear
- Each task will have a text span and a delete button

Notice that the `<ul>` starts empty — we'll fill it with JavaScript.

---

## Step 2: The JavaScript

Open `app.js` and read through the code. Here's what each section does:

### Selecting Elements

```javascript
const input = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
```

We grab references to the input, button, and list using `querySelector`.

### The `addTodo` Function

```javascript
function addTodo() {
  const text = input.value.trim();
  if (text === "") return;

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
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  input.value = "";
  input.focus();
}
```

**Breaking it down:**
1. Get the text from the input and trim whitespace
2. Return early if empty (validation)
3. Create a `<li>` element with class `todo-item`
4. Create a `<span>` for the text with class `todo-text`
5. Create a delete `<button>` with class `delete-btn`
6. Add a click listener on the span to toggle the `done` class
7. Add a click listener on the delete button to remove the item
8. Assemble the elements and add to the list
9. Clear the input and refocus it

### Event Listeners

```javascript
addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
```

- Clicking the button adds a task
- Pressing Enter in the input also adds a task

---

## How It All Connects

| DOM Concept | Where It's Used |
|---|---|
| `querySelector` | Selecting the input, button, and list |
| `createElement` | Building new `<li>`, `<span>`, and `<button>` elements |
| `classList.add` / `toggle` | Styling items as done or active |
| `textContent` | Setting text safely (no innerHTML) |
| `appendChild` | Adding elements to the page |
| `addEventListener` | Handling click and keyboard events |
| `remove()` | Deleting items |
| `trim()` | Preventing empty tasks |
| Event delegation concept | Each item manages its own events |

---

## Try It

1. Open `index.html` in your browser
2. Type a task and click "Add" (or press Enter)
3. Click on the task text to mark it as done
4. Click "Delete" to remove a task
5. Try adding an empty task — nothing happens (validation works!)

---

## Challenges

Once you have the basic version working, try these extensions:

1. **Task counter** — Show "X tasks remaining" at the bottom
2. **Clear all** — Add a button that removes all tasks
3. **Edit tasks** — Double-click a task to edit its text
4. **Local storage** — Save tasks so they persist after page refresh
5. **Drag and drop** — Allow reordering tasks

---

## Next Lesson

Let's review **best practices** and common mistakes to avoid.

→ [Lesson 10: Best Practices](../10-best-practices/)
