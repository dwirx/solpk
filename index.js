const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

// Mengatur folder 'public' sebagai folder statis
app.use(express.static('public'));

app.get('/data', (req, res) => {
  let data = [];

  fs.createReadStream('so.csv')
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      res.send(data);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
