# Lesson 4: Changing Styles

You can change how elements look by modifying their CSS properties directly in JavaScript, or by adding and removing CSS classes.

---

## Method 1: The `style` Property

Every element has a `style` object that lets you set **inline styles** directly.

### HTML Setup

```html
<div class="box">I'm a box!</div>
```

### Changing Styles

```javascript
const box = document.querySelector(".box");

box.style.backgroundColor = "blue";
box.style.color = "white";
box.style.padding = "20px";
box.style.borderRadius = "8px";
box.style.fontSize = "18px";
```

### CSS Property Name Conversion

CSS properties with hyphens become **camelCase** in JavaScript:

| CSS Property | JavaScript Property |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `margin-top` | `marginTop` |
| `text-align` | `textAlign` |
| `border-radius` | `borderRadius` |
| `z-index` | `zIndex` |

### Reading Styles

```javascript
const box = document.querySelector(".box");
console.log(box.style.color); // "" (empty — only reads inline styles)
```

**Important:** `element.style.property` only reads styles set inline. It does NOT read styles from CSS files or `<style>` tags. Use `getComputedStyle()` for that:

```javascript
const box = document.querySelector(".box");
const computed = window.getComputedStyle(box);
console.log(computed.backgroundColor); // Actual computed color
```

---

## Method 2: `classList` (Recommended)

The **best way** to change styles is to add, remove, or toggle CSS classes. This keeps your styling in CSS where it belongs, and your logic in JavaScript.

### CSS Setup

```css
.card {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.card.active {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
}

.card.highlight {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
```

### HTML

```html
<div class="card">My Card</div>
```

### Adding a Class

```javascript
const card = document.querySelector(".card");
card.classList.add("active");
// The card now has class="card active" and looks green
```

### Removing a Class

```javascript
card.classList.remove("active");
// The card is back to its original gray style
```

### Toggling a Class

```javascript
card.classList.toggle("active");
// Adds "active" if it's missing, removes it if it's present
```

This is perfect for things like dark mode toggles or accordion menus.

### Checking if a Class Exists

```javascript
if (card.classList.contains("active")) {
  console.log("Card is currently active!");
}
```

### Adding Multiple Classes

```javascript
card.classList.add("active", "highlight");
```

---

## Practical Examples

### Example 1: Dark Mode Toggle

```html
<style>
  body {
    background-color: white;
    color: black;
    transition: all 0.3s ease;
  }
  body.dark-mode {
    background-color: #1a1a1a;
    color: white;
  }
</style>

<button id="toggleBtn">Toggle Dark Mode</button>
<h1>Hello World</h1>
<p>This is some content.</p>
```

```javascript
const toggleBtn = document.querySelector("#toggleBtn");
const body = document.body;

toggleBtn.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
});
```

### Example 2: Highlight Selected Item

```html
<style>
  .list-item {
    padding: 10px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: 4px;
  }
  .list-item:hover {
    background-color: #f0f0f0;
  }
  .list-item.selected {
    background-color: #2196F3;
    color: white;
  }
</style>

<div class="list-item">Item 1</div>
<div class="list-item">Item 2</div>
<div class="list-item">Item 3</div>
```

```javascript
const items = document.querySelectorAll(".list-item");

items.forEach(function (item) {
  item.addEventListener("click", function () {
    // Remove selected from all
    items.forEach(function (i) {
      i.classList.remove("selected");
    });
    // Add selected to clicked item
    item.classList.add("selected");
  });
});
```

### Example 3: Inline Styles for Dynamic Values

Sometimes you need to set values that change dynamically (like positioning based on data):

```javascript
const bar = document.querySelector(".progress-bar");
const percentage = 75; // from your data

bar.style.width = percentage + "%";
bar.style.backgroundColor = percentage > 80 ? "green" : "orange";
```

---

## When to Use Each Approach

| Approach | Use When |
|---|---|
| `classList` | Toggling predefined styles (most common) |
| `style.property` | Setting dynamic values (positions, widths from data) |
| `getComputedStyle()` | Reading the actual computed style of an element |

---

## Practice Exercise

Create a button that cycles through three colors on each click:

1. Default → Red → Green → Blue → Default → ...
2. Use `classList` with three CSS classes: `.color-red`, `.color-green`, `.color-blue`

---

## Next Lesson

Now let's learn how to change element **attributes** like `src`, `href`, and custom data.

→ [Lesson 5: Changing Attributes](../05-changing-attributes/)
