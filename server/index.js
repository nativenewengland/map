const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// accept raw CSV payloads
app.use(express.text({ type: 'text/csv' }));

// Endpoint to overwrite the CSV on disk
app.post('/data/features.csv', (req, res) => {
  const csvPath = path.join(__dirname, '..', 'data', 'features.csv');
  fs.writeFile(csvPath, req.body, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to save CSV');
    }
    res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

