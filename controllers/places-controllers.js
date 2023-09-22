const HttpError = require('../models/http-error');

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
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }
  
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });
  
  if (!place) {
    throw new HttpError('Could not find a place for the provided ID', 404); 
  }
  
  res.json({ place }); // { place } => { place: place }
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
    
  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });
  
  if (!place) {
    if (!place) {
      throw new HttpError('Could not find a place for the provided user ID', 404);
      // use 'return next(new HttpError('...'), 404)' when dealing with asynchronous code!
    }
  }
    
  res.json({ place });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;