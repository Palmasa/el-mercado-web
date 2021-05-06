import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { useEffect, useRef, useState } from 'react'
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import DeckGL, { GeoJsonLayer } from "deck.gl";

const token = 'pk.eyJ1IjoicGFsbWFzYSIsImEiOiJja2x0OHpvdDYwNmJ5MndvM2NiNGF5NWtzIn0.aVa1uyTkA0cl1WuZezJQtw'

const SearchableMap = ({ lift }) => {
  const [ viewport, setViewPort] = useState({
    latitude: 40.416729,
    longitude: -3.703339,
    zoom: 3,
    transitionDuration: 1000
  })
  const [searchResultLayer, setSearchResult ] = useState(null)

  const mapRef = useRef()

  const captureCoord = (lon, lat) => {
    lift(lon, lat)
  }

  const handleOnResult = event => {
    console.log(event.result.geometry.coordinates[0])
    captureCoord(event.result.geometry.coordinates[0], event.result.geometry.coordinates[1])
    setSearchResult( new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    )
  }

  const handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    console.log("Updating")

    return setViewPort({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  }
  
  useEffect(() => {
    console.log({viewport})
  },[viewport])

  return (
    <div style={{ height: '100%'}}>
      <MapGL 
        ref={mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width="100%"
        height="100%"
        onViewportChange={setViewPort}
        mapboxApiAccessToken={token}
        >
        <Geocoder 
          mapRef={mapRef}
          onResult={handleOnResult}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={token}
          position='top-left'
        />
      </MapGL>
      <DeckGL {...viewport} layers={[searchResultLayer]} />
    </div>
  )

}

export default SearchableMap 