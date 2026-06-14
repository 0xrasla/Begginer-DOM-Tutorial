# Lesson 11: DOM Manipulation Cheat Sheet

Quick reference for all the methods and properties you've learned.

---

## Selecting Elements

| Method | Returns | Example |
|---|---|---|
| `document.getElementById("id")` | Single element | `document.getElementById("header")` |
| `document.querySelector("selector")` | First match | `document.querySelector(".card")` |
| `document.querySelectorAll("selector")` | NodeList | `document.querySelectorAll("p")` |
| `document.getElementsByClassName("name")` | HTMLCollection | `document.getElementsByClassName("item")` |
| `document.getElementsByTagName("tag")` | HTMLCollection | `document.getElementsByTagName("div")` |

---

## Changing Content

| Property | What It Does | Safe for User Input? |
|---|---|---|
| `.textContent` | Read/write plain text | Yes |
| `.innerHTML` | Read/write HTML markup | No |
| `.innerText` | Read/write visible text only | Yes |

---

## Styles & Classes

| Method | What It Does |
|---|---|
| `.style.property = "value"` | Set an inline style (camelCase) |
| `.classList.add("name")` | Add a CSS class |
| `.classList.remove("name")` | Remove a CSS class |
| `.classList.toggle("name")` | Toggle a CSS class on/off |
| `.classList.contains("name")` | Check if a class exists (returns boolean) |

---

## Attributes

| Method | What It Does |
|---|---|
| `.getAttribute("name")` | Get an attribute's value |
| `.setAttribute("name", "value")` | Set an attribute |
| `.removeAttribute("name")` | Remove an attribute |
| `.dataset.name` | Read `data-name` attribute (camelCase) |
| `.dataset.name = "value"` | Set `data-name` attribute |

---

## Creating & Adding Elements

| Method | What It Does |
|---|---|
| `document.createElement("tag")` | Create a new element (in memory) |
| `.appendChild(element)` | Add as the last child |
| `.prepend(element)` | Add as the first child |
| `.insertBefore(new, ref)` | Insert before a reference element |
| `.insertAdjacentHTML(pos, html)` | Insert HTML at a position |
| `.remove()` | Remove the element from the DOM |
| `.cloneNode(true)` | Deep clone (element + children) |

### `insertAdjacentHTML` Positions

```
"beforebegin"  →  [element]
"afterbegin"   →  [element]  ← first child position
"beforeend"    →  [element]  ← last child position
"afterend"     →  [element]
```

---

## Events

| Method | What It Does |
|---|---|
| `.addEventListener(type, fn)` | Listen for an event |
| `.removeEventListener(type, fn)` | Stop listening for an event |
| `event.preventDefault()` | Stop default browser behavior |
| `event.stopPropagation()` | Stop event from bubbling up |
| `event.target` | The element that triggered the event |
| `event.currentTarget` | The element the listener is on |
| `event.type` | The event type name |
| `event.clientX` / `event.clientY` | Mouse position (viewport) |
| `event.pageX` / `event.pageY` | Mouse position (document) |

### Common Event Types

| Event | Fires When |
|---|---|
| `click` | Element clicked |
| `dblclick` | Element double-clicked |
| `mouseenter` | Mouse enters element |
| `mouseleave` | Mouse leaves element |
| `keydown` | Key pressed down |
| `keyup` | Key released |
| `input` | Input value changes |
| `submit` | Form submitted |
| `focus` | Element receives focus |
| `blur` | Element loses focus |
| `load` | Page fully loaded |
| `resize` | Window resized |
| `scroll` | User scrolls |

---

## Traversing the DOM

| Property | What It Returns |
|---|---|
| `.parentElement` | Direct parent element |
| `.parentNode` | Direct parent (any node type) |
| `.children` | All child elements |
| `.firstElementChild` | First child element |
| `.lastElementChild` | Last child element |
| `.nextElementSibling` | Next sibling element |
| `.previousElementSibling` | Previous sibling element |

---

## Useful Utilities

| Method | What It Does |
|---|---|
| `Array.from(nodeList)` | Convert NodeList to array |
| `element.getBoundingClientRect()` | Get size and position info |
| `window.getComputedStyle(element)` | Get actual computed styles |
| `document.createDocumentFragment()` | Create a fragment for batch insertions |

---

## CSS Property → JavaScript Property

| CSS | JavaScript |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `margin-top` | `marginTop` |
| `text-align` | `textAlign` |
| `border-radius` | `borderRadius` |
| `z-index` | `zIndex` |
| `padding-left` | `paddingLeft` |

---

## Common Patterns

### Toggle a Class

```javascript
element.classList.toggle("active");
```

### Check if Element Exists

```javascript
const el = document.querySelector("#something");
if (el) {
  // Element exists
}
```

### Loop Through NodeList

```javascript
document.querySelectorAll(".item").forEach(function (item) {
  console.log(item.textContent);
});
```

### Event Delegation

```javascript
parent.addEventListener("click", function (event) {
  if (event.target.matches(".child-selector")) {
    // Handle the click
  }
});
```

### Prevent Form Reload

```javascript
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Handle form data
});
```

---

*Tip: Bookmark this page for quick reference while building projects!*
