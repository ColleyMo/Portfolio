# Muhammed Colley Portfolio

A lightweight, static portfolio site built with HTML, CSS, JavaScript, and JSON. It has no build step or package dependencies.

## Pages

- `index.html` — Portfolio landing page, education, experience, featured projects, GitHub contributions, and repository cards.
- `cv.html` — CV placeholder page.
- `extracurriculars.html` — Personal reading library.

## Project files

- `css/books.css` — Reading library styling.
- `js/books.js` — Loads, filters, sorts, and renders the book library.
- `data/books.json` — Source of truth for book records.
- `assets/muhammed-colley.png` — Profile photograph.

## Preview locally

The reading page fetches JSON, so serve the folder over HTTP rather than opening the HTML files directly with `file://`:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Add a book

Add another book object to the array in `data/books.json`. The supported fields and value formats are documented in `data/README.md`. Empty strings and `null` are used for unknown details. Commit and push the updated JSON with the site files to publish the new entry.

## GitHub Pages and external data

All site asset and JSON paths are relative, including the book data path resolved relative to `js/books.js`, so the site can be hosted at a GitHub Pages project subpath. GitHub repository statistics, the contribution chart, and optional ISBN-based book covers load from their respective public services when online; the site itself has no backend or third-party code dependencies.
