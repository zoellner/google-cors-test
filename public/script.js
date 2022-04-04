// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let AutocompleteSessionToken;
let AutocompleteService;
let PlacesService;

function postInjectScripts() {

  AutocompleteSessionToken = new google.maps.places.AutocompleteSessionToken();
  AutocompleteService = new google.maps.places.AutocompleteService();
  PlacesService = new google.maps.places.PlacesService(this.$refs.placeDetails);

  const input = 'Mountain View';

  const options = {
    types: ['(regions)']
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.setTypes(['(regions)']);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log(place);
  });

  document.getElementById('button').onclick = function() {
    const input = document.getElementById('test-input').value;
    console.log('Querying for', input);
    queryGoogleMaps(input);
 };
}

function queryGoogleMaps(input) {
  if (!input) { return []; }
  const types = ['(regions)'];

  AutocompleteService.getPlacePredictions({ input, types, sessionToken: AutocompleteSessionToken }, (predictions, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      console.log('Result OK', predictions.filter(filterPrediction));
    } else if (status !== window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      console.error('Google places autocomplete error', { status });
    } else {
      console.log('Result Empty');
    }
  });
}

const validPredictions = new Set(['locality', 'sublocality', 'country', 'administrative_area_level_3', 'sublocality_level_1', 'colloquial_area']);

function filterPrediction(prediction) {
  return prediction && prediction.types && validPredictions.has(prediction.types[0]);
}
