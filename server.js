const express =  require('express');
const path = require('path');
const router = require('./routes/router.js');
const { PORT = 3000 } = [process.env];
const app = express();

// handle body parsing
app.use(express.json()); // for application/json
app.use(express.urlencoded({extends: true})); // for headers

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

const logger = (req, res, next) => {
  const date = new Date();
  console.log('Time: ', date.toLocaleString());
  console.log(req.method);
  next();
};

app.use(logger);

app.get('^/$', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use('/', router);

app.listen(PORT, () => {});
