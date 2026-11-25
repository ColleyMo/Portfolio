# Reading library data

`books.json` is the source of truth for the reading library. Add one object to its array for each book and give each book a unique `id`.

Each object supports: `id`, `title`, `author`, `isbn`, `cover`, `publication_year`, `date_started`, `date_finished`, `rating`, `category`, `status`, `review`, and `notes`.

Use an empty string or `null` when a detail is unknown. Supported statuses are `Finished`, `Currently Reading`, and `Want to Read`. Dates use `YYYY-MM-DD`; ratings are numbers from 1 through 5. If `cover` is empty and an ISBN is present, the page tries the Open Library cover endpoint and falls back to a neutral placeholder if no cover is available.

After updating `books.json`, commit and push it with the site files. The page loads the JSON at runtime, so use a local web server when previewing; opening the HTML directly as a `file://` URL blocks JSON fetches in most browsers.
