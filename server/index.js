const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Load GitHub credentials from environment
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

// Endpoint to commit the CSV to GitHub
app.post('/save-features', async (req, res) => {
  const content = req.body && req.body.content;
  if (!content) {
    return res.status(400).send('Missing content');
  }
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error('Missing GitHub configuration');
    return res.status(500).send('Server misconfigured');
  }
  try {
    // Fetch existing file to get its SHA if it exists
    const getResp = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/features.csv`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'User-Agent': 'map-app',
        },
      }
    );

    let sha;
    if (getResp.status === 200) {
      const getData = await getResp.json();
      sha = getData.sha;
    } else if (getResp.status !== 404) {
      throw new Error('Failed to get existing file');
    }

    // Commit new content
    const body = { message: 'Update features.csv', content };
    if (sha) {
      body.sha = sha;
    }

    const putResp = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/features.csv`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'User-Agent': 'map-app',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!putResp.ok) {
      const text = await putResp.text();
      throw new Error(text);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to save CSV');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

