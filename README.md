## Demo

# paintbloom

A generative flower painting tool. Every visit generates a randomized composition of complete flowers: peonies, daisies, asters, poppies, and tulips as unfilled outline shapes. Pick any color and click a shape to fill it, or switch to draw mode for freehand strokes. Fill the background, undo any action, toggle a grain texture, and download the result as a PNG.

## Features

- Procedural generation of 2–12 flowers per painting, five species, seeded RNG for reproducible layouts
- Click-to-fill painting on real, independently addressable shape regions (no fixed palette)
- Freehand draw layer stored as vector data, separate from the fills
- Background fill, recent-colors tracker (last 8 used), unified undo across fills/strokes/background
- Optional grain texture overlay, PNG export

## Tech

React (Vite), Tailwind CSS v4, Canvas 2D API.

## Running locally

```
npm install
npm run dev


```
