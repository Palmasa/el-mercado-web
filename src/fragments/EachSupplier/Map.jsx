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

    new mapboxgl.Marker({ color: '#E15D45' })
        .setLngLat([lat, lon])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h6>Puesto</h3><p class="mb-0" style="font-size: 0.8rem;">Calle</p><small class="text-main">{{project.owner.name}}</small>'))
        .addTo(map);
    
    return () => map.remove();
  }, [lat, lon])

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;