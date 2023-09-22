const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "The world's most magnificent Art Deco skyscraper",
    location: {
        lat: 40.7484405,
        lng: -73.9878584
    },
    address: "20 W 34th St., New York, NY 10001, USA",
    creator: "u1"
  },
]

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    const error = new Error('Could not find a place for the provided ID');
    error.code = 404;
    throw error; 
  }

  res.json({ place });
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;
  
  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });

  if (!place) {
    if (!place) {
      const error = new Error('Could not find a place for the provided user ID');
      error.code = 404;
      throw error; // use 'return next(error)' when dealing with asynchronous code!
    }
  }
  
  res.json({ place });
});

module.exports = router;
