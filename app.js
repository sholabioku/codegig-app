const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const path = require('path');

const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

const app = express();

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('view engine', 'handlebars');

// Index route

app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Set Static Folder
app.use(express.static(path.join((__dirname, 'public'))));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
