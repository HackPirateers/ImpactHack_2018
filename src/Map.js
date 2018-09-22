import React from "react";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import { Motion, spring } from "react-motion";
import chroma from "chroma-js";
import geographyObject from "./50m.json";

const mapStyles = {
  width: "40%",
  height: "auto"
};


// const markers = [
//   {
//     markerOffset: -25,
//     name: "Buenos Aires",
//     coordinates: [-58.3816, -34.6037]
//   },
//   { markerOffset: -25, name: "La Paz", coordinates: [-68.1193, -16.4897] },
//   { markerOffset: 35, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
//   { markerOffset: 35, name: "Santiago", coordinates: [-70.6693, -33.4489] },
//   { markerOffset: 35, name: "Bogota", coordinates: [-74.0721, 4.711] },
//   { markerOffset: 35, name: "Quito", coordinates: [-78.4678, -0.1807] },
//   { markerOffset: -20, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
//   { markerOffset: -25, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
//   { markerOffset: 35, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
//   { markerOffset: 35, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
//   { markerOffset: -15, name: "Caracas", coordinates: [-66.9036, 10.4806] }
// ];

// const wrapperStyles = {
//   width: "100%",
//   maxWidth: 980,
//   margin: "0 auto"
// };

const colorScale = chroma.scale(["#FF6E40", "FFD740", "#00B8D4"]).mode("lch").colors(24);

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

const Map = ({ center, csize, markers, popData, updateCountry }) => (
  <div>
    <Motion
      defaultStyle={{
        x: center[0],
        y: center[1]
      }}
      style={{
        x: spring(center[0]),
        y: spring(center[1])
      }}
    >
      {({ x, y }) => (
        <ComposableMap
          width={500}
          height={500}
          projection="orthographic"
          projectionConfig={{ scale: 220 }}
          style={mapStyles}
        >
          <ZoomableGlobe center={[x, y]} >
            <circle
              cx={250}
              cy={250}
              r={220}
              fill="transparent"
              stroke="#CFD8DC"
            />
            <Geographies
              disableOptimization
              geography={geographyObject}
            >
              {(geos, proj) =>
                geos.map((geo, i) => (
                  <Geography
                    key={geo.id + i}
                    geography={geo}
                    projection={proj}
                    onClick={() =>updateCountry(geo.properties.sovereignt,geo.properties.brk_name,geo.properties.adm0_a3)}
                    style={{
                      default: {
                        fill: popData ? "#CFD8DC" :
                          colorScale[
                            subregions.indexOf(geo.properties.subregion)
                          ],
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                      }
                    }}
                  />
                ))
              }
            </Geographies>



          </ZoomableGlobe>
        </ComposableMap>
      )}
    </Motion>
  </div>
);

export default Map;
