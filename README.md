# Anna's Archive ISBNs Visualize App

This project is a simple visualization tool for ISBN data from Anna's Archive. The approach taken focuses on using tile-based images to enhance the representation of datasets.

## Live Demo

Check out the live demo: [Anna's Archive ISBN Visualization](https://backrndsource.github.io/aa-isbns-visualize-app/)

## Motivation

Two weeks ago, I discovered Anna's Archive and found its initiative very interesting. The ongoing contest to improve data visualization caught my attention and I decided to build a basic prototype. My goal was to provide at least some inspiration or ideas that could be useful. Regardless of the outcome, this challenge has been a fun experience.

This project is a simple first step, but I hope it provides value or sparks ideas for future improvements!

Special thanks to [wytamma](https://software.annas-archive.li/wytamma) for providing early code on the tile-based approach, which served as my starting point.

## Features / Expectations

- **Tile-based visualization:** PNG tiles with transparency allow overlaying multiple datasets.
- **1-bit image conversion:** Reducing tile size while preserving transparency.
- **Customizable layers:** Users can adjust color, transparency, and visibility.
- **Layer reordering (not implemented yet):** Not enougth time to do it, but drag-and-drop can be cool
- **React and deck.gl:** Solid and well-supported libraries like to facilitate further development.

## Tile Generation

- The tiles are generated using the **vips** tool.
- The demo uses tiles of **5000x5000**, which might not be the most efficient option. They are located at public/tiles.
- The code for generating images and tiles can be found in this repository: [aa-isbns-visualize-utils](https://github.com/BackrndSource/aa-isbns-visualize-utils).

## Tech Stack

- **React** (via Vite)
- **deck.gl** for efficient data rendering