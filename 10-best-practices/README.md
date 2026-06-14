# Lesson 10: Best Practices

As you write more DOM manipulation code, following best practices will keep your code clean, fast, and secure.

---

## 1. Wait for the DOM to Be Ready

If your script runs before the HTML is parsed, `querySelector` will return `null`.

### The Problem

```html
<body>
  <button id="btn">Click me</button>
  <script src="app.js"></script>
</body>
```

```javascript
// app.js
const btn = document.querySelector("#btn"); // null! Script runs before DOM is ready
```

### Solutions

**Option A: Place script at the bottom of `<body>` (simplest)**

```html
<body>
  <button id="btn">Click me</button>
  <script src="app.js"></script> <!-- Script runs after the button exists -->
</body>
```

**Option B: Use `DOMContentLoaded` event**

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector("#btn"); // Works!
  // All your DOM manipulation code goes here
});
```

**Option C: Use the `defer` attribute**

```html
<script src="app.js" defer></script>
```

The `defer` attribute tells the browser to download the script but wait until the HTML is fully parsed before executing it.

---

## 2. Cache Your Selectors

Don't call `querySelector` repeatedly for the same element. Select it once and reuse the reference.

### Bad

```javascript
button.addEventListener("click", function () {
  document.querySelector("#output").textContent = "Clicked!";  // Re-selects every time
  document.querySelector("#output").style.color = "green";     // Re-selects again
});
```

### Good

```javascript
const output = document.querySelector("#output");

button.addEventListener("click", function () {
  output.textContent = "Clicked!";  // Uses cached reference
  output.style.color = "green";     // Uses cached reference
});
```

---

## 3. Use `textContent` Over `innerHTML` for Text

`innerHTML` parses HTML, which is slower and **dangerous** with user input.

### Bad (Security Risk)

```javascript
// If userInput contains <img src=x onerror=alert('hacked')>, it will execute
container.innerHTML = userInput;
```

### Good

```javascript
// Safe — treats everything as plain text
container.textContent = userInput;
```

### Use `innerHTML` Only When

You specifically need to insert HTML markup (like building a list from data):

```javascript
container.innerHTML = "<ul><li>Item 1</li><li>Item 2</li></ul>";
```

---

## 4. Use Event Delegation

When you have many similar elements, don't add a listener to each one. Add one listener to the parent.

### Bad

```javascript
// One listener per item — slow with many items, won't work for dynamically added items
const items = document.querySelectorAll(".list-item");
items.forEach(function (item) {
  item.addEventListener("click", handleClick);
});
```

### Good

```javascript
// One listener on the parent — works for all current and future items
const list = document.querySelector("#list");
list.addEventListener("click", function (event) {
  if (event.target.classList.contains("list-item")) {
    handleClick(event.target);
  }
});
```

---

## 5. Use `classList` Instead of Direct Style Manipulation

Keep your styling in CSS and your logic in JavaScript.

### Bad

```javascript
element.style.backgroundColor = "blue";
element.style.color = "white";
element.style.padding = "10px";
element.style.borderRadius = "4px";
```

### Good

```css
/* In your CSS file */
.active {
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 4px;
}
```

```javascript
// In your JavaScript
element.classList.add("active");
```

---

## 6. Prevent Default When Needed

Don't forget `preventDefault()` on forms, or your page will reload.

```javascript
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Essential!
  // Handle the form data
});
```

---

## 7. Validate User Input

Always check for empty or invalid input before acting on it.

```javascript
function addItem() {
  const text = input.value.trim();

  if (text === "") {
    return; // Don't add empty items
  }

  // Create and add the item
}
```

---

## 8. Clean Up Event Listeners

If you add event listeners that are no longer needed, remove them to prevent memory leaks.

```javascript
function handleClick() {
  console.log("Clicked!");
}

button.addEventListener("click", handleClick);

// When you no longer need it:
button.removeEventListener("click", handleClick);
```

---

## 9. Avoid Memory Leaks with Removed Elements

When you remove an element from the DOM, any event listeners attached to it should also be cleaned up. Modern browsers handle this automatically for most cases, but be aware of it.

---

## 10. Performance Tips

| Tip | Why |
|---|---|
| Batch DOM reads before writes | Reading triggers layout; batch them together |
| Use `DocumentFragment` for multiple insertions | Inserts all elements at once instead of one by one |
| Debounce frequent events (scroll, resize) | Prevents excessive function calls |
| Use `requestAnimationFrame` for animations | Syncs with the browser's repaint cycle |

### Example: DocumentFragment

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = "Item " + i;
  fragment.appendChild(li);
}

// Single DOM update instead of 100
list.appendChild(fragment);
```

---

## Common Mistakes Summary

| Mistake | Fix |
|---|---|
| Selecting before DOM is ready | Use `DOMContentLoaded`, `defer`, or bottom-of-body script |
| Using `innerHTML` with user input | Use `textContent` instead |
| Re-querying the same element | Cache the selector |
| Adding listeners in a loop | Use event delegation |
| Forgetting `preventDefault()` on forms | Always add it for form submissions |
| Not validating empty input | Check `.trim()` before acting |
| Using `var` instead of `let`/`const` | Use `let` or `const` |

---

## Next Lesson

Quick reference for all the methods you've learned.

→ [Lesson 11: Cheat Sheet](../11-cheat-sheet/)
