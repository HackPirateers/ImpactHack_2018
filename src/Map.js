import React from "react";
//We used react-simple-maps to display our globe. Link:(https://www.react-simple-maps.io/)
//In order to create the globe we used Composable Map,
//Zoomable Globe, Geographies, Geography, Markers and Marker

import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";

//This will allow the spinning motion of the globe.
import {Motion, spring} from "react-motion";

//This allows there to be color for each different country (Visual)
import chroma from "chroma-js";

//This contains the Lat/Long data along with Country names and abreveations.
import geographyObject from "./50m.json";

//Reshapes the Mapp size.
const mapStyles = {
  width: "40%",
  height: "auto"
};

//This changes the color scale for each country.
const colorScale = chroma.scale(["#FF6E40", "FFD740", "#00B8D4"]).mode("lch").colors(24);

//This contains the names of the subregions withing the map.
const subregions = [
  "Southern Asia",
  "Polynesia",
  "Micronesia",
  "Southern Africa",
  "Central Asia",
  "Melanesia",
  "Western Europe",
  "Central America",
  "Seven seas (open ocean)",
  "Northern Africa",
  "Caribbean",
  "South-Eastern Asia",
  "Eastern Africa",
  "Australia and New Zealand",
  "Eastern Europe",
  "Western Africa",
  "Southern Europe",
  "Eastern Asia",
  "South America",
  "Middle Africa",
  "Antarctica",
  "Northern Europe",
  "Northern America",
  "Western Asia"
];

//This is the Map const value which contains the main JSX code for the globe.
const Map = ({center, csize, markers, popData, updateCountry}) => (<div>
  {/* //This controls the spinning motion of the globe. */}

  <Motion defaultStyle={{
      x: center[0],
      y: center[1]
    }} style={{
      x: spring(center[0]),
      y: spring(center[1])
    }}>

    {/* //This creation the physical globe. */}
    {
      ({x, y}) => (<ComposableMap width={500} height={500} projection="orthographic" projectionConfig={{
          scale: 220
        }} style={mapStyles}>
        <ZoomableGlobe center={[x, y]}>
          <circle cx={250} cy={250} r={220} fill="transparent" stroke="#CFD8DC"/>
          <Geographies disableOptimization="disableOptimization" geography={geographyObject}>
            {
              (geos, proj) => geos.map((geo, i) => (
              //updateCountry() send the selected country name and country abreveation
              <Geography key={geo.id + i} geography={geo} projection={proj} onClick={() => updateCountry(geo.properties.sovereignt, geo.properties.brk_name, geo.properties.adm0_a3)} style={{
                  default: {
                    fill: popData
                      ? "#CFD8DC"
                      : colorScale[subregions.indexOf(geo.properties.subregion)],
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none"
                  }
                }}/>))
            }
          </Geographies>

        </ZoomableGlobe>
      </ComposableMap>)
    }
  </Motion>
</div>);

export default Map;
