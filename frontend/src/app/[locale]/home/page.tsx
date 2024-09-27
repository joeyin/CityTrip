"use client";

import React from "react";
import {
  GoogleMap,
  BikeStationMarker,
  WaterFountainMarker,
  SearchControl,
  MarkerSidebar,
} from "@components/GoogleMap";

const Home = () => {
  const [active, setActive] = React.useState(false);

  const clickMarker = React.useCallback((result: boolean) => {
    setActive(result)
  }, [])

  const mapCenter = React.useMemo(
    () => ({
      lat: 43.7292717,
      lng: -79.6082231,
    }),
    []
  );

  return (
    <GoogleMap
      onClick={() => setActive(false)}
      mapContainerClassName="w-full h-full relative"
      zoom={12}
      center={mapCenter}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!,
      }}
    >
      <SearchControl />
      <BikeStationMarker
        position={{
          lat: 43.7292717,
          lng: -79.6082231,
        }}
        onClick={() => setActive(!active)}
      />
      <WaterFountainMarker
        position={{
          lat: 43.6692717,
          lng: -79.8082231,
        }}
      />
      <MarkerSidebar visible={active}></MarkerSidebar>
    </GoogleMap>
  );
}

export default React.memo(Home);