'use client';

import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
export default async function NationMap({mapData}) {
  return (
    <ComposableMap projection="geoAzimuthalEqualArea"
                   projectionConfig={{
                     rotate: [0, 0, 0],
                     center: [mapData.translate_x, mapData.translate_y],
                     scale: mapData.scale,
                   }}>
      <Geographies geography={mapData.geo_url}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography
                data-tooltip-target={geo.properties.name + 'tooltip'}
                key={geo.rsmKey}
                geography={geo}
                stroke="#FFF"
                strokeWidth={1}
                fill={mapData.map.find((region) => region.name == geo.properties[mapData.property_name]) != undefined ? mapData.map.find((region) => region.name == geo.properties[mapData.property_name]).color : "#DDD"}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  )
}
