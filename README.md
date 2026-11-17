# Family tree site

**Live site:** https://ritikdave-9.github.io/dwivedi-dave-family-tree/

**Repository:** https://github.com/ritikdave-9/dwivedi-dave-family-tree

Self-contained folder: data, page, and photos only.

## Contents

- `family-tree.json` — tree structure, image list, and name → file map
- `index.html` — loads JSON and renders the tree
- `images/` — photos referenced in `family-tree.json`

## View locally

Browsers block `fetch()` on `file://`. From this folder run:

```bash
python3 -m http.server 8766
```

Open http://localhost:8766/

## Edit the tree

Update the `tree` object in `family-tree.json`. Add or change photos under `images/` and list them in `images.files` and `images.explicit` when needed.

## Single-page poster image

High-density print poster (A3 landscape, ~300 DPI):

```bash
cd scripts && npm install && node export-poster-image.mjs
```

Output: `family-tree-poster.png` (4961×3508 px). Preview: open `index.html?poster=1` in a browser.