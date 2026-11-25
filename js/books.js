const bookGrid = document.querySelector("#book-grid");
const bookStatus = document.querySelector("#book-status");
const categoryFilter = document.querySelector("#category-filter");
const readingFilter = document.querySelector("#reading-filter");
const sortSelect = document.querySelector("#sort-books");
const resultCount = document.querySelector("#result-count");
const bookDialog = document.querySelector("#book-dialog");
const currentYear = new Date().getFullYear();
const openLibraryCover = "https://covers.openlibrary.org/b/isbn/";
const coverFallback = "Book cover unavailable";
let allBooks = [];

function text(value, fallback = "") {
  return typeof value === "string" ? value.trim() : (value == null ? fallback : String(value));
}

function coverFor(book) {
  const explicitCover = text(book.cover);
  if (explicitCover) return explicitCover;
  const isbn = text(book.isbn).replace(/[^0-9Xx]/g, "");
  return isbn ? `${openLibraryCover}${encodeURIComponent(isbn)}-M.jpg?default=false` : "";
}

function displayRating(rating) {
  const value = Number(rating);
  return Number.isFinite(value) && value >= 1 && value <= 5 ? `${"★".repeat(Math.round(value))}${"☆".repeat(5 - Math.round(value))}` : "";
}

function readingStats(books) {
  const finished = books.filter(book => text(book.status).toLowerCase() === "finished");
  return {
    total: books.length,
    reading: books.filter(book => text(book.status).toLowerCase() === "currently reading").length,
    wantToRead: books.filter(book => text(book.status).toLowerCase() === "want to read").length,
    finishedThisYear: finished.filter(book => {
      const date = text(book.date_finished);
      return date && Number(date.slice(0, 4)) === currentYear;
    }).length
  };
}

function renderStats(books) {
  const stats = readingStats(books);
  document.querySelector("#stat-total").textContent = stats.total;
  document.querySelector("#stat-reading").textContent = stats.reading;
  document.querySelector("#stat-want").textContent = stats.wantToRead;
  document.querySelector("#stat-finished").textContent = stats.finishedThisYear;
}

function populateCategories(books) {
  const categories = [...new Set(books.map(book => text(book.category)).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  }
}

function addCover(container, book, className = "book-cover") {
  const cover = coverFor(book);
  if (!cover) {
    const placeholder = document.createElement("span");
    placeholder.className = "cover-placeholder";
    placeholder.textContent = coverFallback;
    container.append(placeholder);
    return;
  }
  const image = document.createElement("img");
  image.className = className;
  image.src = cover;
  image.alt = `Cover of ${text(book.title) || "Untitled book"}`;
  image.loading = "lazy";
  image.onerror = () => {
    const placeholder = document.createElement("span");
    placeholder.className = "cover-placeholder";
    placeholder.textContent = coverFallback;
    image.replaceWith(placeholder);
  };
  container.append(image);
}

function createBookCard(book) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "book-card";
  card.setAttribute("aria-label", `View details for ${text(book.title) || "Untitled book"}`);
  const coverWrap = document.createElement("span");
  coverWrap.className = "book-cover-wrap";
  addCover(coverWrap, book);
  const meta = document.createElement("span");
  meta.className = "book-meta";
  const title = document.createElement("span");
  title.className = "book-title";
  title.textContent = text(book.title) || "Untitled book";
  const author = document.createElement("span");
  author.className = "book-author";
  author.textContent = text(book.author) || "Author not listed";
  meta.append(title, author);
  const badges = document.createElement("span");
  badges.className = "book-badges";
  const rating = displayRating(book.rating);
  if (rating) {
    const ratingNode = document.createElement("span");
    ratingNode.className = "rating";
    ratingNode.setAttribute("aria-label", `Rating ${book.rating} out of 5`);
    ratingNode.textContent = rating;
    badges.append(ratingNode);
  }
  const status = text(book.status);
  if (status) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = status;
    badges.append(badge);
  }
  if (badges.childElementCount) meta.append(badges);
  card.append(coverWrap, meta);
  card.addEventListener("click", () => showBookDetails(book));
  return card;
}

function showBookDetails(book) {
  const dialogCover = document.querySelector("#dialog-cover-wrap");
  dialogCover.replaceChildren();
  addCover(dialogCover, book, "dialog-cover");
  document.querySelector("#dialog-title").textContent = text(book.title) || "Untitled book";
  document.querySelector("#dialog-author").textContent = text(book.author) || "Author not listed";
  const fields = [
    ["Status", book.status], ["Rating", displayRating(book.rating)], ["Category", book.category],
    ["Publication year", book.publication_year], ["ISBN", book.isbn],
    ["Started", book.date_started], ["Finished", book.date_finished], ["Review", book.review], ["Notes", book.notes]
  ];
  const list = document.querySelector("#detail-list");
  list.replaceChildren();
  for (const [label, rawValue] of fields) {
    const value = text(rawValue);
    if (!value) continue;
    const item = document.createElement("div");
    const term = document.createElement("dt"); term.textContent = label;
    const description = document.createElement("dd"); description.textContent = value;
    item.append(term, description); list.append(item);
  }
  if (typeof bookDialog.showModal === "function") bookDialog.showModal();
  else bookDialog.setAttribute("open", "");
}

function compareBooks(a, b, sortBy) {
  const titleA = text(a.title) || "Untitled book";
  const titleB = text(b.title) || "Untitled book";
  if (sortBy === "date") return text(b.date_finished).localeCompare(text(a.date_finished)) || titleA.localeCompare(titleB);
  if (sortBy === "rating") return (Number(b.rating) || 0) - (Number(a.rating) || 0) || titleA.localeCompare(titleB);
  return titleA.localeCompare(titleB, undefined, { sensitivity: "base" });
}

function renderBooks() {
  const category = categoryFilter.value;
  const status = readingFilter.value;
  const filtered = allBooks
    .filter(book => !category || text(book.category) === category)
    .filter(book => !status || text(book.status).toLowerCase() === status.toLowerCase())
    .sort((a, b) => compareBooks(a, b, sortSelect.value));
  bookGrid.replaceChildren();
  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = allBooks.length ? "No books match these filters." : "Your library is ready for its first book. Add books in data/books.json.";
    bookGrid.append(empty);
  } else {
    filtered.forEach(book => bookGrid.append(createBookCard(book)));
  }
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "book" : "books"}`;
}

async function loadBooks() {
  try {
    // Resolve from this module so the same relative path works on a GitHub Pages project site.
    const response = await fetch(new URL("../data/books.json", import.meta.url));
    if (!response.ok) throw new Error(`Could not load data/books.json (HTTP ${response.status}).`);
    const books = await response.json();
    if (!Array.isArray(books)) throw new Error("The books database must contain a JSON array.");
    allBooks = books.filter(book => book && typeof book === "object" && !Array.isArray(book));
    renderStats(allBooks);
    populateCategories(allBooks);
    renderBooks();
  } catch (error) {
    bookStatus.className = "error-state";
    bookStatus.hidden = false;
    bookStatus.textContent = `The reading library could not be loaded. ${error.message} Check that data/books.json contains valid JSON.`;
  }
}

for (const control of [categoryFilter, readingFilter, sortSelect]) control.addEventListener("change", renderBooks);
document.querySelector("#dialog-close").addEventListener("click", () => bookDialog.close());
bookDialog.addEventListener("click", event => { if (event.target === bookDialog) bookDialog.close(); });
loadBooks();
