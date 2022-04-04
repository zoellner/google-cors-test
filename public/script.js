// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let AutocompleteSessionToken;
let AutocompleteService;

function postInjectScripts() {

  AutocompleteSessionToken = new google.maps.places.AutocompleteSessionToken();
  AutocompleteService = new google.maps.places.AutocompleteService();

  const input = document.getElementById('test-input');

  const options = {
    types: ['(regions)']
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log(place);
  });

  document.getElementById('button').onclick = function() {
    const input = document.getElementById('test-input').value;
    console.log('Querying for', input);
    return queryGoogleMaps(input);
 };
}

function queryGoogleMaps(input) {
  if (!input) { return []; }
  const types = ['(regions)'];

  AutocompleteService.getPlacePredictions({ input, types, sessionToken: AutocompleteSessionToken }, (predictions, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log('Result OK', predictions);
    } else if (status !== google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      console.error('Google places autocomplete error', { status });
    } else {
      console.log('Result Empty');
    }
  });
}

