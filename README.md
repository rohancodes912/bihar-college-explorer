# Bihar College Explorer

A responsive website to explore colleges across Bihar. Search by name, filter by city and course, and open a details popup for each college. Built with plain HTML, CSS and JavaScript, with no frameworks, backend, database or API keys.

## Features

- Modern navbar, hero section and search bar
- College cards showing name, city, courses, approximate fees, type and rating
- Live search by college name
- City and course filters that work together with search
- "Reset filters" button and an empty-state message
- Details modal (closes with the close button, a click outside, or the Esc key)
- Responsive layout for mobile, tablet and desktop
- Hover effects, keyboard focus styles and reduced-motion support

## Technologies

- HTML5
- CSS3 (custom properties, Grid, Flexbox, media queries)
- Vanilla JavaScript (ES6)

## Project structure

```
bihar-college-explorer/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to run

1. Download or clone this repository.
2. Open `index.html` in any modern browser.

No installation or server is needed.

```bash
git clone https://github.com/<your-username>/bihar-college-explorer.git
cd bihar-college-explorer
```

## How it works

- All colleges live in one `colleges` array at the top of `script.js`.
- City and course dropdowns are generated from that array.
- `applyFilters()` combines the search text, city and course, then re-renders the cards.
- To add a college, add one new object to the array. The page updates automatically.

## Disclaimer

The data is sample data for learning and demonstration. Fees and ratings are approximate and may be out of date. Check official college websites before making decisions.

## Ideas for improvement

- Sort by rating or fees
- Add a fees range slider
- Save favourite colleges using `localStorage`
- Add a dark mode toggle

## License

Free to use for learning and portfolio purposes.
