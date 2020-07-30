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

  let errors = [];

  // Add field validation
  if (!title) {
    errors.push({ text: 'Please add a title' });
  }

  if (!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }

  if (!description) {
    errors.push({ text: 'Please add a description' });
  }

  if (!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after come
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert data
    Gig.create({ title, technologies, budget, description, contact_email })
      .then((gig) => res.redirect('/gigs'))
      .catch((err) => console.log(err));
  }
});

module.exports = router;
