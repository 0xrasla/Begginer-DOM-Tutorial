# Lesson 7: Handling Events

Events are how your code **reacts** to what the user does — clicking buttons, typing in fields, submitting forms, pressing keys, and more.

---

## What is an Event?

An **event** is a signal that something has happened in the browser. When you click a button, the browser fires a `click` event. JavaScript can listen for that event and run code in response.

---

## Adding Event Listeners: `addEventListener()`

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", function () {
  alert("Button was clicked!");
});
```

Two arguments:
1. **Event type** — a string like `"click"`, `"keydown"`, `"submit"`
2. **Callback function** — the code that runs when the event fires

---

## Common Event Types

### Mouse Events

| Event | Fires When |
|---|---|
| `click` | Element is clicked |
| `dblclick` | Element is double-clicked |
| `mouseenter` | Mouse cursor enters the element |
| `mouseleave` | Mouse cursor leaves the element |
| `mousedown` | Mouse button is pressed down |
| `mouseup` | Mouse button is released |

### Keyboard Events

| Event | Fires When |
|---|---|
| `keydown` | A key is pressed down |
| `keyup` | A key is released |
| `keypress` | A key is pressed (deprecated — use `keydown`) |

### Form Events

| Event | Fires When |
|---|---|
| `submit` | Form is submitted |
| `input` | Value changes in an input field |
| `change` | Input loses focus after value changed |
| `focus` | Element receives focus |
| `blur` | Element loses focus |

### Window Events

| Event | Fires When |
|---|---|
| `load` | Page fully loaded |
| `resize` | Browser window is resized |
| `scroll` | User scrolls the page |

---

## The Event Object

The callback function receives an **event object** with useful information:

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", function (event) {
  console.log("Event type:", event.type);         // "click"
  console.log("Clicked element:", event.target);   // The button that was clicked
  console.log("Mouse X:", event.clientX);          // Horizontal position
  console.log("Mouse Y:", event.clientY);          // Vertical position
});
```

### Key Properties

| Property | What It Contains |
|---|---|
| `event.type` | The event type (`"click"`, `"keydown"`, etc.) |
| `event.target` | The element that triggered the event |
| `event.currentTarget` | The element the listener is attached to |
| `event.clientX` / `event.clientY` | Mouse position relative to the viewport |
| `event.pageX` / `event.pageY` | Mouse position relative to the document |

---

## Preventing Default Behavior

Some events have default browser behavior. For example, submitting a form reloads the page, and clicking a link navigates to a new URL. You can prevent this with `preventDefault()`.

### Form Submission

```html
<form id="signupForm">
  <input type="text" name="name" placeholder="Name">
  <input type="email" name="email" placeholder="Email">
  <button type="submit">Sign Up</button>
</form>
```

```javascript
const form = document.querySelector("#signupForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the page from reloading

  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;

  console.log("Name:", name);
  console.log("Email:", email);

  // Now you can send this data to a server with fetch()
});
```

### Link Navigation

```javascript
const link = document.querySelector("a.no-nav");

link.addEventListener("click", function (event) {
  event.preventDefault(); // Stop navigation
  console.log("Link clicked, but we stayed on this page");
});
```

---

## Event Delegation

When you have many similar elements (like a list of items), adding one event listener to each is inefficient. Instead, add **one listener to the parent** and check which child was clicked.

### The Problem

```javascript
// BAD — One listener per item (slow with many items)
const items = document.querySelectorAll(".list-item");
items.forEach(function (item) {
  item.addEventListener("click", function () {
    console.log("Clicked:", item.textContent);
  });
});
```

### The Solution

```html
<ul id="itemList">
  <li class="list-item">Apple</li>
  <li class="list-item">Banana</li>
  <li class="list-item">Cherry</li>
</ul>
```

```javascript
// GOOD — One listener on the parent (works for existing AND future items)
const list = document.querySelector("#itemList");

list.addEventListener("click", function (event) {
  // event.target is the actual element that was clicked
  if (event.target.classList.contains("list-item")) {
    console.log("Clicked:", event.target.textContent);
  }
});
```

### Why Event Delegation Works

Events **bubble up** through the DOM. When you click a `<li>`, the click event fires on:
1. The `<li>` (target)
2. The `<ul>` (parent)
3. The `<div>` (grandparent)
4. ...all the way up to `document`

By listening on the parent, you catch all clicks from its children.

---

## Removing Event Listeners

To remove a listener, you need a **reference to the same function**:

```javascript
function handleClick() {
  console.log("Clicked!");
}

const btn = document.querySelector("#btn");

// Add the listener
btn.addEventListener("click", handleClick);

// Remove the listener (must pass the SAME function reference)
btn.removeEventListener("click", handleClick);
```

**You cannot remove anonymous functions:**

```javascript
// This WON'T work for removal
btn.addEventListener("click", function () {
  console.log("Clicked!");
});

// You can't remove it because you don't have a reference to that anonymous function
```

---

## Practical Examples

### Example 1: Live Search Filter

```html
<input type="text" id="searchInput" placeholder="Search...">
<ul id="results">
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
  <li>Date</li>
  <li>Elderberry</li>
</ul>
```

```javascript
const searchInput = document.querySelector("#searchInput");
const results = document.querySelectorAll("#results li");

searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();

  results.forEach(function (item) {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = "list-item";
    } else {
      item.style.display = "none";
    }
  });
});
```

### Example 2: Keyboard Shortcuts

```javascript
document.addEventListener("keydown", function (event) {
  // Ctrl/Cmd + S to save
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault();
    console.log("Saving...");
  }

  // Escape to close modal
  if (event.key === "Escape") {
    document.querySelector("#modal").style.display = "none";
  }
});
```

### Example 3: Form Validation on Submit

```html
<form id="registrationForm">
  <input type="text" id="username" placeholder="Username (min 3 chars)">
  <input type="password" id="password" placeholder="Password (min 8 chars)">
  <span id="error" style="color: red;"></span>
  <button type="submit">Register</button>
</form>
```

```javascript
const form = document.querySelector("#registrationForm");
const error = document.querySelector("#error");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (username.length < 3) {
    error.textContent = "Username must be at least 3 characters";
  } else if (password.length < 8) {
    error.textContent = "Password must be at least 8 characters";
  } else {
    error.textContent = "";
    alert("Registration successful!");
  }
});
```

---

## Quick Reference

| Method | What It Does |
|---|---|
| `.addEventListener(type, fn)` | Listen for an event |
| `.removeEventListener(type, fn)` | Stop listening for an event |
| `event.preventDefault()` | Stop default browser behavior |
| `event.stopPropagation()` | Stop event from bubbling up |
| `event.target` | The element that triggered the event |

---

## Next Lesson

Now let's learn how to **navigate** through the DOM tree to find related elements.

→ [Lesson 8: Traversing the DOM](../08-traversing-the-dom/)
