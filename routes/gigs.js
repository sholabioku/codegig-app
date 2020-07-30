const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Get All Available Gigs
router.get('/', (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      res.render('gigs', { gigs });
    })
    .catch((err) => console.log(err))
);

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a Gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  // Insert data
  Gig.create({ title, technologies, budget, description, contact_email })
    .then((gig) => res.redirect('/gigs'))
    .catch((err) => console.log(err));
});

module.exports = router;
