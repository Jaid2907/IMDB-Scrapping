const express = require('express');
const cors = require('cors');
const scraper = require('./scraper');

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to scraping' });
});
app.get('/:imdbId', (req, res) => {
  scraper
    .scraperFunction(req.params.imdbId)
    .then((plot) => res.json({ result: plot }));
});

const port = 8800;

app.listen(port, () => {
  console.log('Listening on port 8800');
});
