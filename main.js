var map = L.map("map").setView([-1.2650367, 36.845025], 13);

let osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  }
);

let CartoDB_Positron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
);

let baseMaps = {
  OpenStreetMap: osm,
  "ESRI World Imagery": Esri_WorldImagery,
  CartoDB: CartoDB_Positron,
};

let police_station;

fetch("data/police_station.geojson")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    police_station = L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "blue",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(feature.properties.name);
      },
    }).addTo(map);
  });

L.control
  .legend({
    position: "bottomleft",
    legends: [
      {
        label: "Police Station",
        type: "circle",
        radius: 8,
        color: "#000",
        fillColor: "blue",
        fillOpacity: 0.8,
        weight: 1,
        layers: [police_station],
      },
    ],
  })
  .addTo(map);

let layerControl = L.control.layers(baseMaps).addTo(map);
