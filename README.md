# Map Project

This project is a web-based map using Leaflet. Users can add custom markers, text labels, and polygons.

## Feature Export

Whenever markers, text labels, or polygons are saved, the map now generates a CSV representation and attempts to write it to `data/features.csv`. If a server endpoint at `data/features.csv` is available, the CSV is posted there to overwrite the file; otherwise a download is triggered in the browser.

Each row of the CSV includes a `type` column identifying the feature (`marker`, `text`, or `polygon`) followed by relevant attributes such as coordinates, label text, and style information.

The initial CSV file lives at `data/features.csv` and can be used as a template for further exports.
