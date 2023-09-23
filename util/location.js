const getCoordsForAddress = address => {
  return {
    lat: 40.7484405,
    lng: -73.9878584
  };
};

module.exports = getCoordsForAddress;

// Wanted to use Google's Geocoding API here, but do not meet the requirements at this current time.
// I will update this when I can, but for now, I will continue to use the above dummy data.