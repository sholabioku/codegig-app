const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Get All Available Gigs
router.get('/', (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      console.log(gigs);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err))
);

// Add a Gig
router.get('/add', (req, res) => {
  const data = {
    title: 'Looking for a React Developer',
    technologies: 'react,javascript,html,css',
    budget: '$3000',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    contact_email: 'shola@gmail.com',
  };

  let { title, technologies, budget, description, contact_email } = data;

  // Insert data
  Gig.create({ title, technologies, budget, description, contact_email })
    .then((gig) => res.redirect('/gigs'))
    .catch((err) => console.log(err));
});

module.exports = router;
