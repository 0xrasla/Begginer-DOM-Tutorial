# Lesson 1: The DOM Tree

## What is the DOM?

**DOM** stands for **Document Object Model**. When the browser loads an HTML file, it doesn't just display it as text. Instead, it builds an internal structure called a **tree** — a network of connected nodes that JavaScript can read and modify.

Think of it like this:

```
HTML file (text)  →  Browser reads it  →  Creates DOM tree  →  JavaScript can manipulate the tree
```

---

## From HTML to a Tree

Consider this simple HTML:

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

The browser converts this into the following tree:

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

### Breaking it down:

- **`document`** — The root of the entire tree. Everything is inside it.
- **`html`** — The `<html>` tag. It has two children: `<head>` and `<body>`.
- **`head`** — Contains `<title>`, which contains the text "My Page".
- **`body`** — Contains `<h1>` and `<p>`, each with their own text content.
- **Text nodes** — The actual text ("Hello World", etc.) are separate nodes inside their parent tags.

---

## What Are Nodes?

In the DOM, **everything is a node**:

| Node Type | Example |
|---|---|
| Element node | `<div>`, `<p>`, `<h1>`, `<span>` |
| Text node | `"Hello World"`, `"This is a paragraph."` |
| Document node | The `document` object itself |

When JavaScript selects an element, it gets a **reference** (a pointer) to that node. You can then read from it or change it.

---

## The `document` Object

The `document` object is your entry point to the DOM. It represents the entire page.

```javascript
// The document itself
console.log(document);

// The document type
console.log(document.doctype); // <!DOCTYPE html>

// The title (from <title> tag)
console.log(document.title); // "My Page"

// The entire HTML content of the page
console.log(document.documentElement); // <html>...</html>
```

---

## Try It Yourself

1. Open any webpage in your browser
2. Press `F12` (or `Cmd+Option+J` on Mac) to open the console
3. Type these commands and see what happens:

```javascript
document.title = "I Changed the Title!";
document.body.style.backgroundColor = "lightblue";
```

You just manipulated the DOM! The page changed because you told JavaScript to modify the tree.

---

## Key Takeaways

- The DOM is a tree representation of your HTML document
- The browser builds the DOM automatically when it loads the page
- JavaScript interacts with the DOM to read or change the page
- `document` is the root — all elements are descendants of it
- Every HTML tag becomes an **element node**, and text becomes a **text node**

---

## Next Lesson

Now that you understand what the DOM tree is, let's learn how to **find elements** in it.

→ [Lesson 2: Selecting Elements](../02-selecting-elements/)
