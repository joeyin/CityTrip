"use client";

import React from "react";
import { GoogleMap, SearchControl, MarkerSidebar } from "@components/GoogleMap";
import { toast } from "react-toastify";
import {
  useGeolocationFn,
  useSearch,
  BikeStationProps,
  WaterFountainProp,
  useIsFirstRender,
} from "@/hooks";
import Marker from "@/components/GoogleMap/Marker";
import { useApp } from "@/providers/AppProvider";

const Home = () => {
  const { queryParameters, setQueryParameters } = useApp();

  const isFirstRender = useIsFirstRender();

  const { stations, waterFountains, lastUpdated, isLoading, refetch } =
    useSearch();

  const [active, setActive] = React.useState<
    undefined | BikeStationProps | WaterFountainProp
  >(undefined);

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

  React.useEffect(() => {
    if (!isFirstRender) {
      refetch();
    }
  }, [queryParameters]); //eslint-disable-line

  return (
    <GoogleMap
      onClick={() => setActive(undefined)}
      mapContainerClassName="w-full h-full relative"
      zoom={15}
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
        clickableIcons: false,
      }}
    >
      <SearchControl
        className="hidden md:flex"
        isLoading={isLoading}
        lastUpdated={lastUpdated}
        queryParameters={queryParameters}
        onSubmit={setQueryParameters}
      />
      {[
        ...(waterFountains ? waterFountains : []),
        ...(stations ? stations : []),
      ].map((i) => (
        <Marker
          {...i}
          key={i.station_id}
          onPress={setActive}
          active={
            i.facility === active?.facility &&
            i.station_id === active?.station_id
          }
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
