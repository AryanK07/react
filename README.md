# Paradise Nursery

Paradise Nursery is a React shopping cart application for an online houseplant shop. It is a course project for IBM's Developing Front-End Apps with React.

## Features

- Landing page with a nursery background image, company information, and a **Get Started** button.
- Catalog with 18 distinct houseplants in three categories. Each plant has a locally stored thumbnail, name, description, price, and Add to Cart button.
- Shared navigation on the catalog and cart pages. The cart indicator counts all units, including multiple units of the same plant.
- Redux Toolkit cart with item totals, a grand total, quantity controls, and deletion. Product buttons become available again after the product is removed.
- Checkout displays a Coming Soon message. Continue Shopping returns to the catalog.

The prices are sample US dollar prices. Product and landing images are generated illustrations. Cart state lasts for the current page session.

## Run locally

Install Node.js 20 or later. In the project directory run:

```bash
npm install
npm run dev
```

Open the local URL that Vite prints. Use `npm run build` to create a production build in `dist`.

## Submission

Push the project source to a public GitHub repository. Open each file in GitHub and copy its individual address into the matching answer box.

| Question | File |
|---|---|
| 1 | `README.md` |
| 2 | `src/AboutUs.jsx` |
| 3 | `src/App.css` |
| 4 | `src/App.jsx` |
| 5 | `src/CartSlice.jsx` |
| 6 | `src/ProductList.jsx` |
| 7 | `src/CartItem.jsx` |

For example, the Question 1 address in a repository named `paradise-nursery` on `main` is `https://github.com/YOUR_USERNAME/paradise-nursery/blob/main/README.md`. Use the username, repository name, and branch shown on your GitHub file page.
