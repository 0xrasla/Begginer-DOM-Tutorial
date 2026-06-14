# Lesson 5: Changing Attributes

HTML elements have attributes like `src`, `href`, `class`, `id`, `placeholder`, and more. JavaScript lets you read, set, and remove these attributes.

---

## Reading Attributes: `getAttribute()`

```html
<a href="https://example.com" target="_blank" title="Visit Example">Link</a>
<img src="photo.jpg" alt="A beautiful photo">
```

```javascript
const link = document.querySelector("a");
console.log(link.getAttribute("href"));   // "https://example.com"
console.log(link.getAttribute("target")); // "_blank"
console.log(link.getAttribute("title"));  // "Visit Example"

const img = document.querySelector("img");
console.log(img.getAttribute("src"));  // "photo.jpg"
console.log(img.getAttribute("alt"));  // "A beautiful photo"
```

---

## Setting Attributes: `setAttribute()`

```javascript
const link = document.querySelector("a");

// Change the href
link.setAttribute("href", "https://google.com");

// Add a new attribute
link.setAttribute("rel", "noopener");

// Set multiple attributes
link.setAttribute("href", "https://google.com");
link.setAttribute("target", "_blank");
```

---

## Removing Attributes: `removeAttribute()`

```javascript
const link = document.querySelector("a");
link.removeAttribute("target"); // Removes the target="_blank" attribute
```

---

## Shortcut Properties for Common Attributes

Some attributes have direct property accessors. These are faster to use but limited to specific attributes.

### Input Elements

```html
<input type="text" id="nameInput" placeholder="Enter your name">
<input type="checkbox" id="agree">
```

```javascript
const input = document.querySelector("#nameInput");

// Read and set value
input.value = "John";              // Set input value
console.log(input.value);          // "John"

// Placeholder
input.placeholder = "Your name...";

// Disabled state
input.disabled = true;             // Disable the input
input.disabled = false;            // Enable it

// Checkbox
const checkbox = document.querySelector("#agree");
checkbox.checked = true;           // Check the checkbox
console.log(checkbox.checked);     // true
```

### Image Elements

```html
<img id="avatar" src="default.jpg" alt="User avatar">
```

```javascript
const avatar = document.querySelector("#avatar");

avatar.src = "new-photo.jpg";      // Change the image source
avatar.alt = "Updated avatar";     // Change the alt text
```

### Link Elements

```javascript
const link = document.querySelector("a");

link.href = "https://newsite.com";  // Change the URL
link.target = "_blank";             // Open in new tab
```

---

## Working with `data-*` Attributes

HTML allows you to create custom attributes that start with `data-`. These are useful for storing extra information on elements.

### HTML Setup

```html
<div class="user-card" data-user-id="42" data-role="admin" data-joined="2024-01-15">
  John Doe
</div>
```

### Reading Data Attributes

```javascript
const card = document.querySelector(".user-card");

// Method 1: Using getAttribute
const userId = card.getAttribute("data-user-id");  // "42"
const role = card.getAttribute("data-role");        // "admin"

// Method 2: Using dataset (recommended)
console.log(card.dataset.userId);   // "42" (note: camelCase!)
console.log(card.dataset.role);     // "admin"
console.log(card.dataset.joined);   // "2024-01-15"
```

**Key difference:** `dataset` uses camelCase for multi-word attributes:
- `data-user-id` → `dataset.userId`
- `data-font-size` → `dataset.fontSize`
- `data-background-color` → `dataset.backgroundColor`

### Setting Data Attributes

```javascript
// Using setAttribute
card.setAttribute("data-status", "active");

// Using dataset (recommended)
card.dataset.status = "active";  // Adds data-status="active" to the element
```

### Removing Data Attributes

```javascript
// Using removeAttribute
card.removeAttribute("data-role");

// Using delete
delete card.dataset.role;
```

---

## Practical Examples

### Example 1: Image Gallery with Data Attributes

```html
<div class="gallery">
  <img src="img1.jpg" data-full="img1-full.jpg" alt="Photo 1">
  <img src="img2.jpg" data-full="img2-full.jpg" alt="Photo 2">
  <img src="img3.jpg" data-full="img3-full.jpg" alt="Photo 3">
</div>
<div id="lightbox" style="display: none;">
  <img id="lightbox-img" src="" alt="">
</div>
```

```javascript
const thumbnails = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");

thumbnails.forEach(function (thumb) {
  thumb.addEventListener("click", function () {
    const fullImage = thumb.getAttribute("data-full");
    lightboxImg.setAttribute("src", fullImage);
    lightboxImg.setAttribute("alt", thumb.alt);
    lightbox.style.display = "block";
  });
});

lightbox.addEventListener("click", function () {
  lightbox.style.display = "none";
});
```

### Example 2: Dynamic Form Validation

```html
<input type="text" id="username" data-minlength="3" data-maxlength="20" data-pattern="^[a-zA-Z]+$">
<span id="error"></span>
```

```javascript
const input = document.querySelector("#username");
const error = document.querySelector("#error");

input.addEventListener("input", function () {
  const value = input.value;
  const minLength = parseInt(input.dataset.minlength);
  const maxLength = parseInt(input.dataset.maxlength);
  const pattern = new RegExp(input.dataset.pattern);

  if (value.length < minLength) {
    error.textContent = "Too short (min " + minLength + " chars)";
  } else if (value.length > maxLength) {
    error.textContent = "Too long (max " + maxLength + " chars)";
  } else if (!pattern.test(value)) {
    error.textContent = "Only letters allowed";
  } else {
    error.textContent = "";
  }
});
```

---

## Quick Reference

| Method | What It Does |
|---|---|
| `element.getAttribute("name")` | Get any attribute value |
| `element.setAttribute("name", "value")` | Set any attribute |
| `element.removeAttribute("name")` | Remove an attribute |
| `element.dataset.name` | Read `data-name` attribute (camelCase) |
| `element.dataset.name = "value"` | Set `data-name` attribute |

---

## Next Lesson

Now let's learn how to **create new elements** and **remove existing ones** from the page.

→ [Lesson 6: Creating & Removing Elements](../06-creating-removing-elements/)
