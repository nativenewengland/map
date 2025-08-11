# Interactive Leaflet Map

This repository contains a small Leaflet-based map web site and a simple admin panel for managing markers. It can be hosted on GitHub Pages.

## Pages

- `index.html` – interactive map displaying markers with custom icons and popups.
- `admin.html` – admin panel to add new markers. Added markers are stored in `localStorage` and exported as JSON for updating `markers.js`.

## Development

1. Edit `markers.js` to adjust the initial marker list.
2. Open `admin.html` in a browser to preview markers or add new ones.
3. Copy the JSON from the admin panel back into `markers.js` to persist changes.
4. Commit and push to GitHub. Enable GitHub Pages to host the site.

## Custom Maps

Place any custom map files in the `custom_maps` directory. These files can be referenced by the application as needed.

## Attribution

Map tiles © [OpenStreetMap](https://www.openstreetmap.org/) contributors.

