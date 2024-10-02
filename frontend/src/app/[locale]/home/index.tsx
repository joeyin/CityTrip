"use client";

import React from "react";
import { GoogleMap, SearchControl, MarkerSidebar } from "@components/GoogleMap";
import { toast } from "react-toastify";
import { useGeolocationFn, useSearch, BikeStationProps } from "@/hooks";
import Marker from "@/components/GoogleMap/Marker";
import { Device } from "@/constants";

const Home = () => {
  const { stations, lastUpdated, isLoading, refetch, formBody } = useSearch({
    defaultFormBody: {
      filter: [Device.BIKE_STATION, Device.WATER_FOUNTAIN],
    },
  });

  const [active, setActive] = React.useState<undefined | BikeStationProps>(
    undefined,
  );

  const [geolocation, fetchCurrentLocation] = useGeolocationFn(
    {
      timeout: 3500, // Set a timeout to reject the promise if it takes more than 3.5 seconds
    },
    (err) => {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
      toast.error(err?.message);
    },
  );

  const defaultMapCenter:
    | google.maps.LatLng
    | google.maps.LatLngLiteral
    | undefined = React.useMemo(
    () => ({
      lat: parseFloat(process.env.NEXT_PUBLIC_GOOGLE_MAPS_DEFAULT_LAT!),
      lng: parseFloat(process.env.NEXT_PUBLIC_GOOGLE_MAPS_DEFAULT_LON!),
    }),
    [] //eslint-disable-line
  );

  const mapCenter: google.maps.LatLng | google.maps.LatLngLiteral | undefined =
    React.useMemo(
      () =>
        geolocation.latitude && geolocation.longitude
          ? {
              lat: geolocation.latitude,
              lng: geolocation.longitude,
            }
          : undefined,
      [geolocation.timestamp, geolocation.latitude, geolocation.longitude] //eslint-disable-line
    );

  React.useEffect(() => {
    fetchCurrentLocation();
  }, []); //eslint-disable-line

  return (
    <GoogleMap
      onClick={() => setActive(undefined)}
      mapContainerClassName="w-full h-full relative"
      zoom={13}
      defaultCenter={defaultMapCenter}
      center={mapCenter}
      options={{
        backControl: true,
        backControlOptions: {
          onClick: fetchCurrentLocation,
          isLoading: geolocation?.loading || undefined,
        },
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!,
        mapTypeControl: false,
      }}
    >
      <SearchControl
        className="hidden md:flex"
        isLoading={isLoading}
        lastUpdated={lastUpdated}
        formBody={formBody}
        onSubmit={refetch}
      />
      {stations?.map((i) => (
        <Marker
          {...i}
          key={i.station_id}
          onPress={setActive}
          active={i.station_id === active?.station_id}
        />
      ))}
      <MarkerSidebar
        geolocation={geolocation}
        visible={active !== undefined}
        marker={active}
        onCancel={() => setActive(undefined)}
      />
    </GoogleMap>
  );
};

export default React.memo(Home);
