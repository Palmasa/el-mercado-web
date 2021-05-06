import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.scss'

mapboxgl.accessToken = 'pk.eyJ1IjoicGFsbWFzYSIsImEiOiJja2x0OHpvdDYwNmJ5MndvM2NiNGF5NWtzIn0.aVa1uyTkA0cl1WuZezJQtw'

const Map = ({lon, lat}) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lat, lon],
      zoom: 10,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    new mapboxgl.Marker({ color: '#f1ebe4' })
        .setLngLat([lat, lon])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h6>Puesto</h3><p class="mb-0" style="font-size: 0.8rem;">Calle</p><small class="text-main">{{project.owner.name}}</small>'))
        .addTo(map);
    
    return () => map.remove();
  }, [lat, lon])

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;

/* 
import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { useEffect, useRef, useState } from 'react'
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

const token = 'pk.eyJ1IjoicGFsbWFzYSIsImEiOiJja2x0OHpvdDYwNmJ5MndvM2NiNGF5NWtzIn0.aVa1uyTkA0cl1WuZezJQtw'

const SearchableMap = () => {
  const [ viewport, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
    transitionDuration: 100
  })
  const [searchResultLayer, setSearchResult ] = useState(null)

  const mapRef = useRef()

  const handleOnResult = event => {
    console.log(event.result)
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
    const geocoderDefaultOverrides = { transitionDuration: 100 };
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
    <div style={{ height: '100vh'}}>
      <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Use the search bar to find a location on the map</h1>
      <MapGL 
        ref={mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        width="100%"
        height="90%"
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

export default SearchableMap */