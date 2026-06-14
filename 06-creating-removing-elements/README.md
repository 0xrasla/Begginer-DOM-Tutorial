# Lesson 6: Creating & Removing Elements

So far you've learned how to find and modify existing elements. Now let's learn how to **add new elements** to the page and **remove existing ones**.

---

## Creating Elements: `createElement()`

```javascript
// Create a new paragraph element
const newParagraph = document.createElement("p");
```

This creates an element, but it **doesn't appear on the page yet**. It exists in memory only. You need to add it to the DOM.

---

## Adding Elements to the Page

### `appendChild()` — Add at the End

```javascript
const container = document.querySelector(".container");

// Create the element
const newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph!";

// Add it to the page (becomes the last child of container)
container.appendChild(newParagraph);
```

### `prepend()` — Add at the Beginning

```javascript
const container = document.querySelector(".container");

const newParagraph = document.createElement("p");
newParagraph.textContent = "I'm first!";

container.prepend(newParagraph);  // Adds as the first child
```

### `insertBefore()` — Add Before a Specific Element

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

```javascript
const list = document.querySelector("#list");
const newItem = document.createElement("li");
newItem.textContent = "New Item";

const secondItem = list.children[1]; // Item 2

list.insertBefore(newItem, secondItem);
```

The list is now:
1. Item 1
2. **New Item**
3. Item 2
4. Item 3

### `insertAdjacentHTML()` — Insert HTML at Specific Positions

This lets you insert raw HTML at four possible positions relative to an element.

```html
<div id="target">Existing content</div>
```

```javascript
const target = document.querySelector("#target");

// "beforebegin" — Before the element itself
target.insertAdjacentHTML("beforebegin", "<p>Before target</p>");

// "afterbegin" — Inside, before the first child
target.insertAdjacentHTML("afterbegin", "<p>First child</p>");

// "beforeend" — Inside, after the last child
target.insertAdjacentHTML("beforeend", "<p>Last child</p>");

// "afterend" — After the element itself
target.insertAdjacentHTML("afterend", "<p>After target</p>");
```

Visual representation:

```
"beforebegin"
  ┌─────────────────────────────────┐
  │  target element                 │
  │  "afterbegin"                   │
  │    [existing content]           │
  │  "beforeend"                    │
  └─────────────────────────────────┘
"afterend"
```

---

## Removing Elements: `remove()`

```javascript
const element = document.querySelector(".unwanted");
element.remove();  // Removes it from the DOM completely
```

That's it! The element and all its children are removed.

---

## Cloning Elements: `cloneNode()`

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

```javascript
const original = document.querySelector(".card");

// Shallow clone — copies only the element, not its children
const shallowCopy = original.cloneNode(false);

// Deep clone — copies the element AND all its children (most common)
const deepCopy = original.cloneNode(true);

// Add the copy to the page
document.body.appendChild(deepCopy);
```

### Important: Clone Event Listeners

`cloneNode()` does **not** copy event listeners. If the original element had click handlers, the clone won't have them. You need to re-attach them manually.

---

## Practical Examples

### Example 1: Dynamic List Builder

```html
<input type="text" id="itemInput" placeholder="Add an item...">
<button id="addBtn">Add</button>
<ul id="itemList"></ul>
```

```javascript
const input = document.querySelector("#itemInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#itemList");

function addItem() {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  // Create the list item
  const li = document.createElement("li");
  li.textContent = text;

  // Create a delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = " × ";
  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  // Add delete button to the list item
  li.appendChild(deleteBtn);

  // Add the list item to the page
  list.appendChild(li);

  // Clear the input
  input.value = "";
  input.focus();
}

addBtn.addEventListener("click", addItem);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});
```

### Example 2: Building a Card Grid from Data

```html
<div id="cardGrid"></div>
```

```javascript
const users = [
  { name: "Alice", role: "Designer", avatar: "alice.jpg" },
  { name: "Bob", role: "Developer", avatar: "bob.jpg" },
  { name: "Charlie", role: "Manager", avatar: "charlie.jpg" }
];

const grid = document.querySelector("#cardGrid");

users.forEach(function (user) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${user.avatar}" alt="${user.name}">
    <h3>${user.name}</h3>
    <p>${user.role}</p>
  `;

  grid.appendChild(card);
});
```

### Example 3: Confirm Before Delete

```javascript
function deleteItem(element) {
  const confirmed = confirm("Are you sure you want to delete this?");
  if (confirmed) {
    element.remove();
  }
}

// Attach to a delete button
const deleteBtn = document.querySelector("#deleteBtn");
deleteBtn.addEventListener("click", function () {
  deleteItem(document.querySelector(".item-to-delete"));
});
```

---

## Quick Reference

| Method | What It Does |
|---|---|
| `document.createElement("tag")` | Create a new element (in memory) |
| `.appendChild(element)` | Add as the last child |
| `.prepend(element)` | Add as the first child |
| `.insertBefore(new, reference)` | Insert before a specific child |
| `.insertAdjacentHTML(position, html)` | Insert HTML at a specific position |
| `.remove()` | Remove the element from the DOM |
| `.cloneNode(true)` | Deep clone (element + children) |

---

## Next Lesson

Now let's learn how to make your page **interactive** by responding to user actions.

→ [Lesson 7: Handling Events](../07-handling-events/)
