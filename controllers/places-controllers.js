const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
    
  const places = DUMMY_PLACES.filter(p => {
    return p.creator === userId;
  });
  
  if (!places || places.length === 0) {
      throw new HttpError('Could not find places for the provided user ID', 404);
      // use 'return next(new HttpError('...'), 404)' when dealing with asynchronous code!
  }
    
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please try again', 422);
  }
  
  const { title, description, address, creator } = req.body; // const title = req.body.title

  const location = getCoordsForAddress(address);

  const createdPlace = {
    id: uuid.v4(),
    title, // title: title
    description,
    location,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace); //DUMMY_PLACES.unshift(createdPlace) if want to add it as the first element

  res.status(201).json({place: createdPlace});
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please try again', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({place: updatedPlace});
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (DUMMY_PLACES.find(p => p.id === placeId)) {
    throw new HttpError('A place with the given ID does not exist', 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({ message: 'Place deleted' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;