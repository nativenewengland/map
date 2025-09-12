# Map Project

This project is a web-based map using Leaflet. Users can add custom markers, text labels, and polygons.

## Feature Export

Whenever markers, text labels, or polygons are saved, the map generates a CSV representation and tries to POST it to `/save-features`. If the request succeeds (HTTP 200), the file is committed to the GitHub repository. If the request fails or returns a non-OK response, the browser falls back to downloading `features.csv` locally.

Each row of the CSV includes a `type` column identifying the feature (`marker`, `text`, or `polygon`) followed by relevant attributes such as coordinates, label text, and style information.

For persistent storage, run the Express server in `server/index.js` with the following environment variables:

```
GITHUB_TOKEN=your_token GITHUB_OWNER=owner GITHUB_REPO=repo node server/index.js
```

The server exposes a `POST /save-features` route that commits the uploaded CSV to `data/features.csv` in the specified GitHub repository. Without this server the CSV will only be downloaded on the client.

The initial CSV file lives at `data/features.csv` and can be used as a template for further exports.
