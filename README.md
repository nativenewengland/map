# Interactive Leaflet Map

This repository contains a small Leaflet-based map web site and a modern admin panel for managing markers. It can be hosted on GitHub Pages.

## Pages

- `index.html` – interactive map displaying markers with custom icons and popups.
- `admin.html` – dashboard for adding, importing, and exporting markers. Data is stored in `localStorage` and can be exported as JSON or a JS array for updating `markers.js`.

## Development

1. Edit `markers.js` to adjust the initial marker list.
2. Open `admin.html` in a browser to preview markers or add new ones.
3. Copy the JSON from the admin panel back into `markers.js` to persist changes.
4. Commit and push to GitHub. Enable GitHub Pages to host the site.

## Custom Maps

Place any custom map files in the `custom_maps` directory. These files can be referenced by the application as needed.

## Custom Icons

Marker icon images can be stored in the `custom_icons` directory. Use the `icon` property on each marker to reference an icon file.

## Attribution

Map tiles © [OpenStreetMap](https://www.openstreetmap.org/) contributors.

