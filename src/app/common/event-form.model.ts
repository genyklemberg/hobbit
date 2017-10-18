export class EventForm {
  event_types = [
    {value: 'sport', viewValue: 'Sport'},
    {value: 'casual', viewValue: 'Casual'},
    {value: 'puzzle', viewValue: 'Puzzle'},
    {value: 'box', viewValue: 'Box'},
  ];
  cities = [
    {value: 'lviv', viewValue: 'Lviv'},
    {value: 'odesa', viewValue: 'Odesa'},
    {value: 'kyiv', viewValue: 'Kyiv'}
  ];
  districts = [
    {value: 'Frankivskiy', viewValue: 'Frankivskiy'},
    {value: 'Galitskiy', viewValue: 'Galitskiy'},
    {value: 'Shevchenkivskiy', viewValue: 'Shevchenkivskiy'},
  ];
  event_categories = [
    {value: 'casual', viewValue: 'Casual'},
    {value: 'tournament', viewValue: 'Tournament'},
  ];
  event_modes = [
    {value: 'single', viewValue: 'Single'},
    {value: 'team', viewValue: 'Team'},
  ];
  locations = [
    {value: 'lviv', viewValue: 'Lviv', center_lat: 49.853338, center_lng: 24.024192, districts: [
      {value: 'frankivskiy', viewValue: 'Frankivskiy'},
      {value: 'galitskiy', viewValue: 'Galitskiy'},
      {value: 'shevchenkivskiy', viewValue: 'Shevchenkivskiy'},]},
    {value: 'kyiv', viewValue: 'Kyiv', center_lat: 50.450597, center_lng: 30.523205, districts: [
      {value: 'obolon', viewValue: 'Obolon'},
      {value: 'pechersky', viewValue: 'Pechersky'},
      {value: 'podil', viewValue: 'Podil'},]},
    {value: 'odesa', viewValue: 'Odesa', center_lat: 46.482404, center_lng: 30.723625, districts: [
      {value: 'prymorsky', viewValue: 'Prymorsky'},
      {value: 'kyivski', viewValue: 'Kyivski'}]},
  ];
}
