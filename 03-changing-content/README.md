# Lesson 3: Changing Content

Once you've selected an element, you can change what's inside it. There are three main ways to do this, each with different tradeoffs.

---

## Method 1: `textContent` (Recommended for Text)

Sets or gets the **plain text** inside an element. Any HTML tags in the string are treated as literal text, not rendered as HTML.

### HTML Setup

```html
<p id="message">Original text</p>
```

### Reading Text

```javascript
const message = document.querySelector("#message");
console.log(message.textContent); // "Original text"
```

### Changing Text

```javascript
message.textContent = "New text!";
```

The paragraph now displays: **New text!**

### Why `textContent` is Safe

```javascript
// User types this as input
const userInput = '<img src=x onerror=alert("hacked")>';

// Using textContent — shows the HTML as plain text (SAFE)
message.textContent = userInput;
// Output on page: <img src=x onerror=alert("hacked")>

// Using innerHTML — would execute the script (DANGEROUS)
message.innerHTML = userInput;
// This would trigger the alert!
```

**Rule of thumb:** Use `textContent` whenever you're displaying user-provided or dynamic text.

---

## Method 2: `innerHTML` (For HTML Content)

Parses the string as HTML and inserts it into the element. Use this when you need to insert actual HTML markup.

### HTML Setup

```html
<div id="content">Old content</div>
```

### Changing HTML Content

```javascript
const content = document.querySelector("#content");
content.innerHTML = "<h2>New Title</h2><p>This is a new paragraph.</p>";
```

The div now contains a heading and a paragraph, both rendered as actual HTML.

### Reading HTML Content

```javascript
console.log(content.innerHTML);
// Output: "<h2>New Title</h2><p>This is a new paragraph.</p>"
```

### When to Use `innerHTML`

- Building complex HTML structures from JavaScript
- Inserting templates or formatted content
- When you specifically need HTML rendering (not just text)

### When NOT to Use `innerHTML`

- When displaying user input (security risk — XSS attacks)
- When you only need to change plain text (use `textContent` instead)

---

## Method 3: `innerText` (Visible Text Only)

Similar to `textContent`, but only returns text that is **visually visible** on the page.

### Difference from `textContent`

```html
<p id="example" style="display: none;">Hidden paragraph</p>
<p>Visible paragraph</p>
```

```javascript
const hidden = document.querySelector("#example");

console.log(hidden.textContent);  // "Hidden paragraph" (returns all text)
console.log(hidden.innerText);    // "" (returns only visible text)
```

### Performance Note

`innerText` triggers a **layout re-render** because it needs to check what's visible. This makes it slower than `textContent`. For most cases, `textContent` is the better choice.

---

## Comparison Table

| Property | Parses HTML? | Returns Hidden Text? | Performance | Safe for User Input? |
|---|---|---|---|---|
| `textContent` | No | Yes | Fast | Yes |
| `innerHTML` | Yes | Yes | Moderate | No |
| `innerText` | No | No | Slow (layout reflow) | Yes |

---

## Practical Examples

### Example 1: Live Character Counter

```html
<textarea id="bio" maxlength="200"></textarea>
<p>Characters remaining: <span id="counter">200</span></p>
```

```javascript
const textarea = document.querySelector("#bio");
const counter = document.querySelector("#counter");

textarea.addEventListener("input", function () {
  const remaining = 200 - textarea.value.length;
  counter.textContent = remaining;

  if (remaining < 20) {
    counter.style.color = "red";
  } else {
    counter.style.color = "black";
  }
});
```

### Example 2: Greeting Based on Time

```html
<p id="greeting"></p>
```

```javascript
const greeting = document.querySelector("#greeting");
const hour = new Date().getHours();

if (hour < 12) {
  greeting.textContent = "Good Morning!";
} else if (hour < 18) {
  greeting.textContent = "Good Afternoon!";
} else {
  greeting.textContent = "Good Evening!";
}
```

### Example 3: Building a List

```html
<ul id="fruits"></ul>
```

```javascript
const fruitsList = document.querySelector("#fruits");
const fruits = ["Apple", "Banana", "Cherry", "Date"];

let html = "";
fruits.forEach(function (fruit) {
  html += "<li>" + fruit + "</li>";
});

fruitsList.innerHTML = html;
```

---

## Practice Exercise

Given this HTML:

```html
<h1 id="title">Original Title</h1>
<p id="description">Original description</p>
<div id="output"></div>
```

Try:
1. Change the title text to "Updated Title" using `textContent`
2. Change the description to `<strong>Bold description</strong>` using `innerHTML`
3. Create a paragraph element, set its text to "Dynamic content", and append it to the `#output` div using `appendChild()`

---

## Next Lesson

Now let's learn how to change the **visual appearance** of elements.

→ [Lesson 4: Changing Styles](../04-changing-styles/)
