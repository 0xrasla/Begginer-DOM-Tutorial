# Lesson 8: Traversing the DOM

Sometimes you've selected one element and need to move to its **parent**, **children**, or **siblings**. This is called **DOM traversal**.

---

## Why Traverse?

Imagine you have this structure:

```html
<div class="product">
  <h3>iPhone 15</h3>
  <p class="price">$999</p>
  <button class="buy-btn">Buy Now</button>
</div>
```

When the user clicks "Buy Now", you want to find the product name. Instead of selecting it separately, you can **traverse** from the button to find the `<h3>` inside the same parent.

---

## Parent Nodes

### `parentNode`

Returns the direct parent (could be any node type):

```javascript
const child = document.querySelector(".child");
console.log(child.parentNode); // The parent element
```

### `parentElement` (Recommended)

Returns the direct parent **element** only. This is what you'll use 99% of the time:

```javascript
const child = document.querySelector(".child");
console.log(child.parentElement); // The parent <div>, <ul>, etc.
```

---

## Children

### `children`

Returns all child **elements** (skips text nodes):

```javascript
const parent = document.querySelector(".parent");
console.log(parent.children);       // HTMLCollection of child elements
console.log(parent.children.length); // Number of child elements
console.log(parent.children[0]);     // First child element
```

### `firstElementChild`

Returns the first child that is an element:

```javascript
const parent = document.querySelector(".parent");
console.log(parent.firstElementChild); // First child element
```

### `lastElementChild`

Returns the last child that is an element:

```javascript
const parent = document.querySelector(".parent");
console.log(parent.lastElementChild); // Last child element
```

---

## Siblings

### `nextElementSibling`

Returns the next element at the same level:

```javascript
const item = document.querySelector(".second");
console.log(item.nextElementSibling); // The .third element
```

### `previousElementSibling`

Returns the previous element at the same level:

```javascript
const item = document.querySelector(".second");
console.log(item.previousElementSibling); // The .first element
```

---

## Visual Reference

Given this structure:

```html
<div class="parent">
  <p class="first">First</p>
  <p class="second">Second</p>
  <p class="third">Third</p>
</div>
```

Starting from `.second`:

```
             .parent
            (parentNode)
                 │
    ┌────────────┼────────────┐
    │            │            │
 .first       .second      .third
    │            │            │
    └────────────┴────────────┘
  (previous     (current)   (next
  Element         Element    Element
  Sibling)       Sibling)   Sibling)
```

---

## Practical Examples

### Example 1: Accordion Component

```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header">Section 1</button>
    <div class="accordion-content">
      <p>Content for section 1</p>
    </div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header">Section 2</button>
    <div class="accordion-content">
      <p>Content for section 2</p>
    </div>
  </div>
</div>
```

```javascript
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(function (header) {
  header.addEventListener("click", function () {
    // Traverse from the header to find its content
    const content = header.nextElementSibling;

    // Toggle visibility
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});
```

### Example 2: Remove Button That Affects Its Parent

```html
<div class="alert">
  <span>Something went wrong!</span>
  <button class="dismiss-btn">×</button>
</div>
```

```javascript
const dismissBtns = document.querySelectorAll(".dismiss-btn");

dismissBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // Traverse up to the alert and remove it
    const alert = btn.parentElement;
    alert.remove();
  });
});
```

### Example 3: Building Breadcrumb Navigation

```html
<nav class="breadcrumb">
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <a href="/products/phones">Phones</a>
  <span>iPhone 15</span>
</nav>
```

```javascript
const breadcrumb = document.querySelector(".breadcrumb");
const links = breadcrumb.children;

// Add arrow separators between items
for (let i = 0; i < links.length - 1; i++) {
  const arrow = document.createElement("span");
  arrow.textContent = " → ";
  arrow.classList.add("separator");
  links[i].insertAdjacentElement("afterend", arrow);
}
```

---

## Traversal vs. Query Selection

You might wonder: why traverse when you can just use `querySelector`?

| Approach | When to Use |
|---|---|
| `querySelector` | You know exactly what you're looking for |
| Traversal | You have one element and need to find related elements nearby |

**Traversal is better when:**
- You're already in an event handler and have `event.target`
- You need to find siblings, parents, or children of a known element
- You want code that doesn't depend on specific IDs or classes

---

## Quick Reference

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

## Next Lesson

Time to put everything together! Let's build a **To-Do List** app.

→ [Lesson 9: Mini Project — To-Do List](../09-mini-project/)
