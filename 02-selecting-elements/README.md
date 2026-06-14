# Lesson 2: Selecting Elements

Before you can change anything on the page, you need to **find it**. JavaScript provides several methods to select elements from the DOM.

---

## Method 1: `getElementById()`

Selects **one element** by its `id` attribute. This is the simplest and fastest way to find a specific element.

### HTML Setup

```html
<p id="greeting">Hello, World!</p>
<p id="farewell">Goodbye!</p>
```

### JavaScript

```javascript
const greeting = document.getElementById("greeting");
console.log(greeting); // <p id="greeting">Hello, World!</p>
```

### Important Rules

- IDs must be **unique** — only one element can have a given ID
- Pass the ID name **without the `#` symbol** — just the string
- Returns `null` if no element with that ID exists

```javascript
const missing = document.getElementById("nothing");
console.log(missing); // null
```

---

## Method 2: `querySelector()`

Selects the **first element** that matches a CSS selector. This is the most versatile and commonly used method.

### By Tag Name

```html
<p>First paragraph</p>
<p>Second paragraph</p>
```

```javascript
const firstParagraph = document.querySelector("p");
console.log(firstParagraph); // <p>First paragraph</p>
```

### By Class Name

```html
<div class="card">Card 1</div>
<div class="card">Card 2</div>
```

```javascript
const firstCard = document.querySelector(".card");
console.log(firstCard); // <div class="card">Card 1</div>
```

### By ID

```html
<div id="header">My Header</div>
```

```javascript
const header = document.querySelector("#header");
console.log(header); // <div id="header">My Header</div>
```

### Nested Selectors

```html
<nav>
  <a href="/home">Home</a>
  <a href="/about">About</a>
</nav>
```

```javascript
const firstNavLink = document.querySelector("nav a");
console.log(firstNavLink); // <a href="/home">Home</a>
```

### Attribute Selectors

```html
<input type="text" placeholder="Name">
<input type="email" placeholder="Email">
```

```javascript
const emailInput = document.querySelector('input[type="email"]');
console.log(emailInput); // <input type="email" placeholder="Email">
```

### Returns `null` if Nothing Matches

```javascript
const nothing = document.querySelector(".nonexistent");
console.log(nothing); // null
```

---

## Method 3: `querySelectorAll()`

Like `querySelector`, but returns **all matching elements** instead of just the first one.

```html
<p>Paragraph 1</p>
<p>Paragraph 2</p>
<p>Paragraph 3</p>
```

```javascript
const allParagraphs = document.querySelectorAll("p");
console.log(allParagraphs.length); // 3

// Loop through all matches
allParagraphs.forEach(function (paragraph) {
  console.log(paragraph.textContent);
});
// Output:
// "Paragraph 1"
// "Paragraph 2"
// "Paragraph 3"
```

### Converting to an Array

`querySelectorAll` returns a **NodeList**, not an array. Most of the time this doesn't matter, but if you need array methods like `map()` or `filter()`, convert it first:

```javascript
const allParagraphs = document.querySelectorAll("p");
const paragraphsArray = Array.from(allParagraphs);

const longTexts = paragraphsArray.filter(function (p) {
  return p.textContent.length > 10;
});
```

---

## Older Methods (Still Useful to Know)

### `getElementsByClassName()`

```html
<div class="item">Item 1</div>
<div class="item">Item 2</div>
<div class="item">Item 3</div>
```

```javascript
const items = document.getElementsByClassName("item");
console.log(items.length); // 3
console.log(items[0]); // <div class="item">Item 1</div>
```

- Returns a **live HTMLCollection** (updates automatically when the DOM changes)
- No `forEach` on older browsers — use a `for` loop instead

### `getElementsByTagName()`

```javascript
const divs = document.getElementsByTagName("div");
console.log(divs.length); // Number of <div> elements
```

---

## Comparison Table

| Method | Selects | Returns | Supports CSS Selectors |
|---|---|---|---|
| `getElementById()` | One element by ID | Single element | No |
| `querySelector()` | First match | Single element or `null` | Yes |
| `querySelectorAll()` | All matches | NodeList | Yes |
| `getElementsByClassName()` | By class | Live HTMLCollection | No |
| `getElementsByTagName()` | By tag | Live HTMLCollection | No |

---

## Which One Should I Use?

For most cases, use **`querySelector`** and **`querySelectorAll`**. They:

- Accept any CSS selector you already know
- Have consistent, predictable behavior
- Are easy to read and maintain

Use `getElementById` when you have the ID and want the fastest lookup.

---

## Practice Exercise

Given this HTML:

```html
<div id="app">
  <h2 class="title">Welcome</h2>
  <ul>
    <li class="item">Apple</li>
    <li class="item">Banana</li>
    <li class="item">Cherry</li>
  </ul>
  <button id="clearBtn">Clear List</button>
</div>
```

Try selecting:
1. The `<h2>` by its class
2. All `<li>` elements
3. The button by its ID
4. The first `<li>` using a nested selector

---

## Next Lesson

Now that you can find elements, let's learn how to **change their content**.

→ [Lesson 3: Changing Content](../03-changing-content/)
