# DOM Manipulation — A Beginner's Complete Guide

> **What is the DOM?**
> The **Document Object Model (DOM)** is a programming interface for HTML documents.
> It represents the page as a **tree of nodes and objects**, so that languages like JavaScript can change the document structure, style, and content.

Think of the DOM as a **bridge** between your HTML code and JavaScript. When you load a webpage, the browser reads the HTML and creates a tree-like structure (the DOM) that JavaScript can read and modify.

---

## Table of Contents

1. [What You'll Learn](#1-what-youll-learn)
2. [Prerequisites](#2-prerequisites)
3. [The DOM Tree — How the Browser Sees Your HTML](#3-the-dom-tree)
4. [Selecting Elements](#4-selecting-elements)
5. [Changing Content](#5-changing-content)
6. [Changing Styles](#6-changing-styles)
7. [Changing Attributes](#7-changing-attributes)
8. [Creating & Removing Elements](#8-creating--removing-elements)
9. [Handling Events](#9-handling-events)
10. [Traversing the DOM](#10-traversing-the-dom)
11. [Putting It All Together — Mini Project](#11-putting-it-all-together)
12. [Common Mistakes & Best Practices](#12-common-mistakes--best-practices)
13. [Quick Reference Cheat Sheet](#13-quick-reference-cheat-sheet)

---

## 1. What You'll Learn

By the end of this tutorial, you will be able to:

- Understand how the browser builds the DOM from HTML
- Find any element on a page using JavaScript
- Change text, HTML, styles, and attributes of elements
- Add new elements to the page or remove existing ones
- Respond to user actions (clicks, key presses, form submissions)
- Move around the DOM tree to find related elements

---

## 2. Prerequisites

Before starting, you should know:

- Basic HTML (tags, attributes, nesting)
- Basic JavaScript (variables, functions, `let`/`const`)

You do **not** need any frameworks — everything here works with plain (vanilla) JavaScript.

---

## 3. The DOM Tree — How the Browser Sees Your HTML

When the browser loads this HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

It creates a tree that looks like this:

```
document
 └── html
      ├── head
      │    └── title
      │         └── "My Page"
      └── body
           ├── h1
           │    └── "Hello World"
           └── p
                └── "This is a paragraph."
```

**Key points:**
- `document` is the root — every element lives inside it.
- Each HTML tag becomes a **node** in this tree.
- Text inside tags becomes a **text node**.
- JavaScript interacts with this tree — it does **not** edit the HTML file directly.

---

## 4. Selecting Elements

Before you can change something, you need to **find it**. JavaScript gives you several ways to select elements.

### 4.1 `getElementById()`

Selects **one element** by its `id` attribute. IDs must be unique on a page.

```html
<p id="greeting">Hello!</p>
```

```javascript
const greeting = document.getElementById("greeting");
console.log(greeting); // <p id="greeting">Hello!</p>
```

### 4.2 `querySelector()`

Selects the **first element** that matches a CSS selector. This is the most versatile method.

```javascript
// By tag name
const firstParagraph = document.querySelector("p");

// By class name
const firstCard = document.querySelector(".card");

// By ID
const header = document.querySelector("#header");

// Nested selector
const linkInNav = document.querySelector("nav a");

// Attribute selector
const emailInput = document.querySelector('input[type="email"]');
```

### 4.3 `querySelectorAll()`

Selects **all matching elements**. Returns a NodeList (like an array).

```javascript
const allParagraphs = document.querySelectorAll("p");
console.log(allParagraphs.length); // number of <p> elements

// Loop through them
allParagraphs.forEach(function (paragraph) {
  console.log(paragraph.textContent);
});
```

### 4.4 Older Methods (Still Useful)

```javascript
// Select by class — returns an HTMLCollection
const items = document.getElementsByClassName("item");

// Select by tag — returns an HTMLCollection
const divs = document.getElementsByTagName("div");
```

> **Tip:** `querySelector` and `querySelectorAll` are the most commonly used today because they accept any CSS selector you already know.

---

## 5. Changing Content

Once you've selected an element, you can change what's inside it.

### 5.1 `textContent` — Plain Text

```javascript
const heading = document.querySelector("h1");
heading.textContent = "New Heading!";  // Replaces all text inside <h1>
```

- Sets **plain text only** — any HTML tags are treated as literal text.
- Use this when you want to display user input or data safely (prevents HTML injection).

### 5.2 `innerHTML` — HTML Content

```javascript
const container = document.querySelector(".container");
container.innerHTML = "<h2>Title</h2><p>New paragraph</p>";
```

- Parses the string as HTML and inserts it.
- **Warning:** Never use `innerHTML` with user-provided input — it can introduce security risks (XSS attacks).

### 5.3 `innerText` — Visible Text

```javascript
const element = document.querySelector(".hidden-text");
console.log(element.innerText); // Only returns text that is visible on screen
```

- `textContent` returns **all** text (even hidden).
- `innerText` only returns **visible** text and triggers a layout re-render (slower).

### When to Use What?

| Method | Use When |
|---|---|
| `textContent` | Setting or reading plain text (fastest, safest) |
| `innerHTML` | You need to insert actual HTML markup |
| `innerText` | You need to read only what's visually displayed |

---

## 6. Changing Styles

### 6.1 The `style` Property (Inline Styles)

```javascript
const box = document.querySelector(".box");

box.style.backgroundColor = "blue";
box.style.color = "white";
box.style.padding = "20px";
box.style.borderRadius = "8px";
```

> **Note:** CSS property names with hyphens become **camelCase** in JavaScript:
> - `background-color` → `backgroundColor`
> - `font-size` → `fontSize`
> - `margin-top` → `marginTop`

### 6.2 `classList` — Adding, Removing, Toggling CSS Classes

This is the **recommended** way to change styles. It keeps your styling in CSS and your logic in JavaScript.

```html
<style>
  .card {
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .card.active {
    background-color: yellow;
    font-weight: bold;
  }
</style>

<div class="card">My Card</div>
```

```javascript
const card = document.querySelector(".card");

card.classList.add("active");      // Adds the class
card.classList.remove("active");   // Removes the class
card.classList.toggle("active");   // Adds it if missing, removes it if present

// Check if a class exists
if (card.classList.contains("active")) {
  console.log("Card is active!");
}
```

---

## 7. Changing Attributes

### 7.1 Reading and Setting Attributes

```javascript
const link = document.querySelector("a");

// Get an attribute
const href = link.getAttribute("href");

// Set an attribute
link.setAttribute("href", "https://example.com");

// Remove an attribute
link.removeAttribute("target");
```

### 7.2 Working with Common Properties Directly

Some attributes have shortcut properties:

```javascript
const input = document.querySelector("input");

input.value = "Hello";                // Set input value
input.disabled = true;                // Disable the input

const img = document.querySelector("img");
img.src = "photo.jpg";               // Change image source
img.alt = "A beautiful photo";       // Change alt text

const checkbox = document.querySelector("input[type='checkbox']");
checkbox.checked = true;              // Check the checkbox
```

### 7.3 Working with `data-*` Attributes

HTML allows custom data attributes that start with `data-`:

```html
<div class="user-card" data-user-id="42" data-role="admin">
  John Doe
</div>
```

```javascript
const card = document.querySelector(".user-card");

// Using getAttribute
const userId = card.getAttribute("data-user-id"); // "42"

// Using the dataset property (recommended)
console.log(card.dataset.userId);  // "42"  (camelCase!)
console.log(card.dataset.role);    // "admin"

// Setting a data attribute
card.dataset.status = "active";    // Adds data-status="active" to the element
```

---

## 8. Creating & Removing Elements

### 8.1 Creating Elements

```javascript
// Step 1: Create the element
const newParagraph = document.createElement("p");

// Step 2: Add content and attributes
newParagraph.textContent = "This is a new paragraph!";
newParagraph.classList.add("intro");

// Step 3: Add it to the page
const container = document.querySelector(".container");
container.appendChild(newParagraph);  // Adds at the end of container
```

### 8.2 Inserting Elements in Specific Positions

```javascript
const parent = document.querySelector(".list");
const new_item = document.createElement("li");
new_item.textContent = "Item 2";

const existingItem = document.querySelector(".list li:first-child");

// Insert BEFORE a specific element
parent.insertBefore(new_item, existingItem);

// Modern alternative: insertAdjacentHTML
parent.insertAdjacentHTML("beforeend", "<li>Item 3</li>");
```

**`insertAdjacentHTML` positions:**

```
"beforebegin"  →  [element]
"afterbegin"   →  [element]  ← inserts here first
"beforeend"    →  [element]  ← inserts here last
"afterend"     →  [element]
```

### 8.3 Removing Elements

```javascript
const unwanted = document.querySelector(".ad-banner");
unwanted.remove();  // Removes it from the DOM entirely
```

### 8.4 Cloning Elements

```javascript
const original = document.querySelector(".card");
const copy = original.cloneNode(true);  // true = deep clone (copies children too)
document.body.appendChild(copy);
```

---

## 9. Handling Events

Events let your code **react** to what the user does — clicks, key presses, mouse movements, form submissions, and more.

### 9.1 Adding an Event Listener

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", function () {
  alert("Button was clicked!");
});
```

The two arguments:
1. **Event type** — what to listen for (`"click"`, `"keydown"`, `"submit"`, etc.)
2. **Callback function** — what to do when it happens

### 9.2 Common Event Types

| Event | Fires When |
|---|---|
| `click` | Element is clicked |
| `dblclick` | Element is double-clicked |
| `mouseenter` | Mouse enters the element |
| `mouseleave` | Mouse leaves the element |
| `keydown` | A key is pressed down |
| `keyup` | A key is released |
| `input` | Value changes in an input field |
| `submit` | A form is submitted |
| `focus` | Element receives focus (e.g., clicking an input) |
| `blur` | Element loses focus |

### 9.3 The Event Object

The callback receives an **event object** with useful information:

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", function (event) {
  console.log("Clicked element:", event.target);
  console.log("Mouse position:", event.clientX, event.clientY);
  console.log("Event type:", event.type);
});
```

### 9.4 Practical Examples

**Toggle dark mode on button click:**

```javascript
const toggleBtn = document.querySelector("#darkModeToggle");
const body = document.body;

toggleBtn.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
});
```

**Input field live preview:**

```javascript
const input = document.querySelector("#nameInput");
const output = document.querySelector("#nameOutput");

input.addEventListener("input", function () {
  output.textContent = input.value;
});
```

**Form submission:**

```javascript
const form = document.querySelector("#signupForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the page from reloading

  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;

  console.log("Name:", name);
  console.log("Email:", email);
});
```

**Key press detection:**

```javascript
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    console.log("Escape key pressed — closing modal");
  }
});
```

### 9.5 Removing an Event Listener

You need a **named function reference** to remove it:

```javascript
function handleClick() {
  console.log("Clicked!");
}

const btn = document.querySelector("#btn");
btn.addEventListener("click", handleClick);

// Later, to remove it:
btn.removeEventListener("click", handleClick);
```

---

## 10. Traversing the DOM

Sometimes you've selected one element and need to move to its **parent**, **children**, or **siblings**.

### 10.1 Parent Nodes

```javascript
const child = document.querySelector(".child");

child.parentNode;         // The direct parent (any node type)
child.parentElement;      // The direct parent (only element nodes — usually what you want)
```

### 10.2 Children

```javascript
const parent = document.querySelector(".parent");

parent.children;          // HTMLCollection of child ELEMENTS (no text nodes)
parent.firstElementChild; // First child element
parent.lastElementChild;  // Last child element
```

### 10.3 Siblings

```javascript
const item = document.querySelector(".item");

item.nextElementSibling;     // Next ELEMENT sibling
item.previousElementSibling; // Previous ELEMENT sibling
```

### 10.4 Example: Building a Simple Tab Component

```html
<div class="tabs">
  <button class="tab active" data-tab="1">Tab 1</button>
  <button class="tab" data-tab="2">Tab 2</button>
  <button class="tab" data-tab="3">Tab 3</button>
</div>
<div class="tab-content" data-content="1">Content 1</div>
<div class="tab-content hidden" data-content="2">Content 2</div>
<div class="tab-content hidden" data-content="3">Content 3</div>
```

```javascript
const tabs = document.querySelectorAll(".tab");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    // Remove active from all tabs
    tabs.forEach(function (t) {
      t.classList.remove("active");
    });

    // Add active to clicked tab
    tab.classList.add("active");

    // Hide all content
    document.querySelectorAll(".tab-content").forEach(function (content) {
      content.classList.add("hidden");
    });

    // Show matching content
    const targetId = tab.getAttribute("data-tab");
    document.querySelector('[data-content="' + targetId + '"]').classList.remove("hidden");
  });
});
```

---

## 11. Putting It All Together — Mini Project

Let's build a **To-Do List** using everything we've learned.

### The HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 40px auto;
      padding: 0 20px;
    }
    .input-group {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }
    input[type="text"] {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 6px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
    .todo-list {
      list-style: none;
      padding: 0;
    }
    .todo-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      margin-bottom: 8px;
      background-color: #f9f9f9;
      border-radius: 6px;
      border: 1px solid #eee;
    }
    .todo-item.done .todo-text {
      text-decoration: line-through;
      color: #999;
    }
    .delete-btn {
      background-color: #f44336;
      padding: 6px 12px;
      font-size: 14px;
    }
    .delete-btn:hover {
      background-color: #d32f2f;
    }
  </style>
</head>
<body>
  <h1>My To-Do List</h1>

  <div class="input-group">
    <input type="text" id="todoInput" placeholder="Add a new task...">
    <button id="addBtn">Add</button>
  </div>

  <ul class="todo-list" id="todoList"></ul>

  <script src="app.js"></script>
</body>
</html>
```

### The JavaScript (`app.js`)

```javascript
// Select elements
const input = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

// Function to create a new to-do item
function addTodo() {
  const text = input.value.trim();

  // Don't add empty tasks
  if (text === "") {
    return;
  }

  // Create the list item
  const li = document.createElement("li");
  li.classList.add("todo-item");

  // Create the text span
  const span = document.createElement("span");
  span.classList.add("todo-text");
  span.textContent = text;

  // Create the delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";

  // Toggle "done" class when clicking the text
  span.addEventListener("click", function () {
    li.classList.toggle("done");
  });

  // Remove the item when clicking delete
  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  // Assemble and add to the list
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  // Clear the input
  input.value = "";
  input.focus();
}

// Add task when clicking the button
addBtn.addEventListener("click", addTodo);

// Add task when pressing Enter in the input
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
```

### What You Just Built

This small app demonstrates:

| Concept | Where It's Used |
|---|---|
| `querySelector` | Selecting the input, button, and list |
| `createElement` | Building new `<li>`, `<span>`, and `<button>` elements |
| `classList.add` / `toggle` | Styling items as done or active |
| `textContent` | Setting text safely |
| `appendChild` | Adding elements to the page |
| `addEventListener` | Handling click and keyboard events |
| `remove()` | Deleting items |
| `trim()` and validation | Preventing empty tasks |

---

## 12. Common Mistakes & Best Practices

### Mistakes to Avoid

1. **Selecting before the DOM is ready**
   ```javascript
   // BAD — script runs before the element exists
   const btn = document.querySelector("#btn"); // null!

   // GOOD — wrap in DOMContentLoaded or place script at bottom of <body>
   document.addEventListener("DOMContentLoaded", function () {
     const btn = document.querySelector("#btn"); // works!
   });
   ```

2. **Using `innerHTML` with user input**
   ```javascript
   // DANGEROUS — user could type <img src=x onerror=alert('hacked')>
   container.innerHTML = userInput;

   // SAFE — use textContent
   container.textContent = userInput;
   ```

3. **Forgetting `preventDefault()` on forms**
   ```javascript
   // Page reloads on submit — not what you want for a SPA
   form.addEventListener("submit", function () { /* ... */ });

   // GOOD
   form.addEventListener("submit", function (e) {
     e.preventDefault();
     // Now handle the data with JavaScript
   });
   ```

4. **Adding too many event listeners in loops**
   ```javascript
   // BAD — one listener per element (slow with many items)
   items.forEach(function (item) {
     item.addEventListener("click", handleClick);
   });

   // BETTER — delegate from the parent (one listener total)
   todoList.addEventListener("click", function (event) {
     if (event.target.classList.contains("delete-btn")) {
       event.target.parentElement.remove();
     }
   });
   ```

### Best Practices

- Use `querySelector` / `querySelectorAll` — they are the most flexible and consistent.
- Prefer `classList` over direct `style` manipulation for better separation of concerns.
- Use `textContent` for text, `innerHTML` only when you need to insert actual HTML.
- Use **event delegation** (one listener on a parent) when dealing with many similar elements.
- Always call `event.preventDefault()` when handling form submissions.
- Cache your selectors — don't call `querySelector` on the same element repeatedly inside event handlers.

---

## 13. Quick Reference Cheat Sheet

### Selecting

| Method | Returns | Use Case |
|---|---|---|
| `document.getElementById("id")` | Single element | By unique ID |
| `document.querySelector("selector")` | First match | By any CSS selector |
| `document.querySelectorAll("selector") | NodeList | All matches |

### Modifying Content

| Property | What It Does |
|---|---|
| `.textContent` | Read/write plain text (safe) |
| `.innerHTML` | Read/write HTML (careful with user input) |
| `.innerText` | Read/write visible text only |

### Styles & Classes

| Method | What It Does |
|---|---|
| `.style.property = "value"` | Set inline style (camelCase) |
| `.classList.add("name")` | Add a CSS class |
| `.classList.remove("name")` | Remove a CSS class |
| `.classList.toggle("name")` | Toggle a CSS class |
| `.classList.contains("name")` | Check if class exists |

### Attributes

| Method | What It Does |
|---|---|
| `.getAttribute("name")` | Get an attribute value |
| `.setAttribute("name", "value")` | Set an attribute |
| `.removeAttribute("name")` | Remove an attribute |
| `.dataset.property` | Read/write `data-*` attributes |

### Creating & Adding

| Method | What It Does |
|---|---|
| `document.createElement("tag")` | Create a new element |
| `.appendChild(element)` | Add as last child |
| `.prepend(element)` | Add as first child |
| `.insertBefore(new, ref)` | Insert before a reference element |
| `.insertAdjacentHTML(pos, html)` | Insert HTML at a specific position |
| `.remove()` | Remove element from the DOM |
| `.cloneNode(true)` | Deep clone an element |

### Events

| Method | What It Does |
|---|---|
| `.addEventListener(type, fn)` | Listen for an event |
| `.removeEventListener(type, fn)` | Stop listening for an event |
| `event.preventDefault()` | Stop default browser behavior |
| `event.stopPropagation()` | Stop event from bubbling up |
| `event.target` | The element that triggered the event |

### Traversing

| Property | What It Returns |
|---|---|
| `.parentElement` | Direct parent element |
| `.children` | All child elements |
| `.firstElementChild` | First child element |
| `.lastElementChild` | Last child element |
| `.nextElementSibling` | Next sibling element |
| `.previousElementSibling` | Previous sibling element |

---

## Keep Learning

Now that you understand DOM manipulation, here are some directions to explore next:

- **Fetch API** — load data from servers and update the DOM dynamically
- **Local Storage** — save data in the browser so it persists after refresh
- **Animations** — use `requestAnimationFrame` or CSS transitions with JavaScript
- **Frameworks** — React, Vue, and Angular all build on these same DOM concepts

The DOM is the foundation of every interactive webpage. Master these basics and everything else becomes easier to learn.

---

*Last updated: June 2026*
