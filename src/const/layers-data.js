export const LAYERS = [
  {
    "id": "test",
    "type": "geojson",
    "params": {
      "color": "#CCC"
    },
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [12.3046875, 48.69096039092549],
                  [5.625, 20.632784250388028],
                  [45.3515625, 27.059125784374068],
                  [48.515625, 45.82879925192134],
                  [12.3046875, 48.69096039092549]
                ]
              ]
            }
          }
        ]
      }
    },
    "render": {
      "layers": [
        {
          "type": "fill",
          "paint": {
            "fill-color": "red",
            "fill-opacity": 1
          }
        },
        {
          "type": "line",
          "paint": {
            "line-color": "{{color}}",
            "line-opacity": 0.1
          }
        }
      ]
    }
  },
  {
    id: 'test-2',
    type: 'raster',
    source: {
      "type": "raster",
      "tiles": ["http://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png"]
    },   
    active: true,
    opacity: 1
  },
];

