# Family tree illustration — AI generation prompt

Use this with **IMAGE-GENERATION-PROMPT-BLOCK** below. Attach **`reference/tree-of-life-reference.jpeg`** as the style reference. Use **photos** from the `images/` folder for each person (composite / image-to-image), or describe round photo medallions if the tool cannot paste faces.

## Layout (critical)

1. **Bottom center (trunk / root):** **Maha Pandit Raghunath Ji** — thickest trunk, circular portrait, name below. This is the **only** anchor at the ground; the tree grows **upward**.
2. **Above:** Generations rise on **symmetrical brown branches** (Tree of Life style, like the reference).
3. **Youngest generations** sit at the **top / outer branch tips** (leaves area).
4. **Direction:** bottom → top only (not a top-down org chart on a page).

## Style (match reference)

- Flat vector / clean illustration, white or soft cream background.
- Dark brown branches (`#5c3d2e`), simple **oval green leaves** at tips (`#2e6b3e`).
- Mirror symmetry left/right; roots optional at bottom (subtle).
- Each person: **round photo frame** (wooden ring) + **full name** in small serif/clean sans label.

## Hierarchy (bottom → top)

| Level | Node(s) | Image file(s) |
| ----- | ------- | ------------- |
| 0 (trunk) | Maha Pandit Raghunath Ji | `maha-pandit-raghunath-ji.jpeg` |
| 1 | Shri Vallabh Ji | *(no photo — silhouette or empty medallion)* |
| 2 | Devki Vallabh & Mani Devi | `devki-vallabh.jpeg`, `mani-devi.jpeg` |
| 3a | Shanti Vallabh & Shashikala | `shanti-vallabh.jpg`, `shashikala.jpg` |
| 3b | Anand Vallabh & Nandini | `pair-anand-vallabh-and-nandini.jpeg` |
| 3c | Indra Vallabh & Maya Devi | `indra-vallabh.jpeg`, `maya-devi.jpeg` |
| 4 (Shanti branch) | Jitendra & Jaya → Harshita, Ritik | `jitendra-dave.jpeg`, `jaya-dave.jpeg`, `harshita-dave.jpeg`, `ritik-dave.jpeg` |
| 4 | Sunita & Gunwanth → Pulkit & Samriddhi, Piyul | `sunita-dwivedi.jpeg`, `gunwanth-dwivedi.jpeg`, `pulkit-dwivedi.jpeg`, `samriddhi.jpg`, `piyul-dwivedi.jpg` |
| 4 (Anand branch) | Jayesh & Mini → Naisha | `pair-jayesh-and-mini.jpeg`, `naisha.jpeg` |
| 4 | Abhishek & Rachna → Aryan | `pair-abhishek-and-rachna.jpeg`, `aryan.jpeg` |
| 4 (Indra branch) | Surabhi & Hridesh Vyas → Javesh | `surabhi.jpeg`, `hridesh-vyas.jpeg`, `javesh.jpeg` |
| 4 | Parul & Narendra Sharma → Bhav Sharma, Avishi | `parul.jpeg`, `narendra-sharma.jpeg`, `bhav-sharma.jpeg`, `avishi.jpeg` |
| 4 | Neha & Vinod Sharma → Trisha | `neha.jpeg`, *(Vinod — no photo)*, `trisha.jpeg` |

Data source: **`family-tree.json`** → `tree` + `images.registry`.

## IMAGE-GENERATION-PROMPT-BLOCK

Copy everything in this section into your image model (DALL·E, Midjourney, Ideogram, etc.).

```
Create a wide high-resolution family tree illustration in the style of a symmetrical "Tree of Life":
thick dark brown trunk at the BOTTOM CENTER splitting into upward curving branches with oval green leaves at the outer tips, subtle roots at the base, flat vector aesthetic, soft white background (match attached reference sketch).

BOTTOM TRUNK NODE (largest): circular photo of an elderly pandit — label "Maha Pandit Raghunath Ji".

Growing UPWARD along branches, place round wooden-framed portrait medallions with printed names for each family member in this order:
Shri Vallabh Ji (silhouette only); Devki Vallabh & Mani Devi side by side on one branch; three main branches above for Shanti Vallabh & Shashikala, Anand Vallabh & Nandini (one shared couple photo), Indra Vallabh & Maya Devi; further up, smaller branches for children and grandchildren including Jitendra & Jaya, Harshita, Ritik, Sunita & Gunwanth, Pulkit & Samriddhi, Piyul, Jayesh & Mini, Naisha, Abhishek & Rachna, Aryan, Surabhi & Hridesh Vyas, Javesh, Parul & Narendra Sharma, Bhav Sharma, Avishi, Neha & Vinod Sharma, Trisha.

Use the exact portrait photos supplied in the images folder when compositing; keep faces clearly visible in circles. Branch lines connect parent to child clearly. No text other than names. Warm, respectful, celebratory tone. Aspect ratio 3:2 or 16:9 landscape, print-ready 4K.
```

## Negative prompt

```
No cartoon animals, no fantasy creatures, no cluttered background, no top-down corporate org chart, no root at top, no illegible names, no duplicate faces, no watermark.
```

## After generation

- Save as `family-tree-artwork.png` next to this file.
- Update `family-tree.json` meta with `"generatedArtwork": "family-tree-artwork.png"` if you use it on a page.

## Image naming rules (folder `images/`)

| Pattern | Example |
| ------- | ------- |
| Solo | `ritik-dave.jpeg`, `maya-devi.jpeg` |
| Pair | `pair-jayesh-and-mini.jpeg` |
| Group (optional) | `group-jayesh-mini-naisha.jpeg` |

All mappings: `family-tree.json` → `images.registry` and `images.explicit`.