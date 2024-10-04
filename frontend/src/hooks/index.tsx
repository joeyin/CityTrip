"use client";

import { Facility } from "@/constants";
import { useApp } from "@/providers/AppProvider";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

export interface GeolocationProps {
  loading: boolean | null;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | Error | null;
}

export interface StationInformationProps {
  station_id: string;
  name: string;
  physical_configuration: string;
  lat: number;
  lon: number;
  altitude: null;
  address: string;
  capacity: number;
  is_charging_station: boolean;
  rental_methods: RentalMethod[];
  groups: string[];
  obcn: string;
  short_name: string;
  nearby_distance: number;
  _ride_code_support: boolean;
  rental_uris: object;
}

export interface StationStatusProps {
  station_id: string;
  num_bikes_available: number;
  num_bikes_available_types: {
    mechanical: number;
    ebike: number;
  };
  num_bikes_disabled: number;
  num_docks_available: number;
  num_docks_disabled: number;
  last_reported: number;
  is_charging_station: boolean;
  status: string;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  traffic: null;
}

export interface BikeStationProps
  extends StationInformationProps,
    Omit<StationStatusProps, "status"> {
  active?: boolean;
  onPress?: (props: WaterFountainProp | BikeStationProps) => void;
  rating?: number;
  facility: Facility;
  status: boolean;
  status_text: string;
}

export interface WaterFountainResProp {
  type: string;
  geometry: {
    coordinates: [number, number][];
    type: string;
  };
  properties: {
    AssetName: string;
    Comments: string;
    PostedDate: string;
    Reason: string;
    Status: string;
    address: string;
    alternative_name: string;
    asset_id: string;
    id: string;
    location: string;
    location_details: string;
    type: string;
    url: string;
    _id: string;
  };
}

export interface WaterFountainProp {
  station_id: string;
  name: string;
  lat: number;
  lon: number;
  address: string;
  status: boolean;
  status_text: string;
  reason: string;
  type: string[];
  location: string;
  location_details: string;
  url: string;
  active?: boolean;
  onPress?: (props: WaterFountainProp | BikeStationProps) => void;
  rating?: number;
  facility: Facility;
}

export enum RentalMethod {
  "Key",
  "TransitCard",
  "CreditCard",
  "Phone",
}

export function useGeolocationFn(
  options: PositionOptions = {
    timeout: 10000,
  },
  onError: (error: GeolocationPositionError | Error | null) => void = () => {},
): [GeolocationProps, () => void] {
  const [state, setState] = useState<GeolocationProps>({
    loading: null,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  const firedRef = useRef<boolean>(false);
  const optionsRef = useRef(options);

  const fetchCurrentLocation = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    firedRef.current = false;

    const timeoutId = setTimeout(() => {
      const message = "Geolocation request timed out.";
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: new Error(message),
      }));
      onError(new Error(message));
      firedRef.current = true;
    }, options.timeout);

    navigator.geolocation.getCurrentPosition(
      ({ coords, timestamp }) => {
        clearTimeout(timeoutId);
        setState({
          loading: false,
          timestamp,
          latitude: coords.latitude,
          longitude: coords.longitude,
          altitude: coords.altitude,
          accuracy: coords.accuracy,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed,
          error: null,
        });
      },
      (error) => {
        clearTimeout(timeoutId);
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error,
        }));
        if (!firedRef.current) {
          onError(
            new Error(
              error.message || "Geolocation failed due to an internal error.",
            ),
            //ref: https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
          );
        }
      },
      optionsRef.current,
    );
  }, []); //eslint-disable-line

  return [state, fetchCurrentLocation];
}

export function useSearch(): {
  lastUpdated: number | undefined;
  stations: BikeStationProps[] | undefined;
  waterFountains: WaterFountainProp[] | undefined;
  refetch: () => void;
  isLoading: boolean;
} {
  const [hasLoggedError, setHasLoggedError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number>(new Date().getTime());

  const { onError } = useSWRConfig();
  const { queryParameters } = useApp();

  const {
    error: waterFountainsHasError,
    data: waterFountainsResponse,
    isLoading: isLoadingWaterFountains,
    isValidating: isValidatingWaterFountains,
    mutate: refetchWaterFountains,
  } = useSWR<{
    features: WaterFountainResProp[];
    type: string;
  }>(
    {
      url: "drinking-fountains.json",
      method: "GET",
    },
    {
      onError: () => {},
    },
  );

  const {
    error: informationHasError,
    data: information,
    isLoading: isLoadingInformation,
    isValidating: isValidatingInformation,
    mutate: refetchInformation,
  } = useSWR<{
    last_updated: number;
    ttl: number;
    data: { stations: StationInformationProps[] };
  }>(
    {
      url: "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information",
    },
    {
      onError: () => {},
    },
  );

  const {
    error: statusHasError,
    data: status,
    isLoading: isLoadingStatus,
    isValidating: isValidatingStatus,
    mutate: refetchStatus,
  } = useSWR<{
    last_updated: number;
    ttl: number;
    data: { stations: StationStatusProps[] };
  }>(
    {
      url: "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status",
    },
    {
      onError: () => {},
    },
  );

  const stations: BikeStationProps[] | undefined = useMemo(() => {
    if (!status || !information?.data?.stations) return undefined;

    return status.data.stations.map((station) => ({
      ...station,
      facility: Facility.BIKE_STATION,
      rating: 4,
      status: station.status === "IN_SERVICE" ? true : false,
      status_text: station.status,
      ...(information.data.stations.find(
        (info) => info.station_id === station.station_id,
      ) as StationInformationProps),
    }));
  }, [status, information]);

  const waterFountains: WaterFountainProp[] | undefined = useMemo(() => {
    if (!waterFountainsResponse || !waterFountainsResponse?.features)
      return undefined;

    return waterFountainsResponse.features.map((item) => ({
      station_id: item.properties.asset_id,
      name: item.properties.AssetName,
      lat: item.geometry.coordinates[0][1],
      lon: item.geometry.coordinates[0][0],
      address: item.properties.address,
      reason: item.properties.Reason,
      type: item.properties.type.split(",").map((str) => str.trim()),
      location: item.properties.location,
      location_details: item.properties.location_details,
      url: item.properties.url,
      rating: 4,
      status: item.properties.Status === "1" ? true : false,
      status_text: item.properties.Status === "1" ? "IN_SERVICE" : "CLOSED",
      facility: Facility.WATER_FOUNTAIN,
    }));
  }, [waterFountainsResponse]);

  const refetch = useCallback(async () => {
    setHasLoggedError(false);

    const tasks = [];
    if (queryParameters?.facility.includes(Facility.BIKE_STATION)) {
      tasks.push(refetchInformation());
      tasks.push(refetchStatus());
    }

    if (!queryParameters?.facility.includes(Facility.BIKE_STATION)) {
      refetchInformation(undefined, { revalidate: false });
      refetchStatus(undefined, { revalidate: false });
    }

    if (queryParameters?.facility.includes(Facility.WATER_FOUNTAIN)) {
      refetchWaterFountains();
    }

    if (!queryParameters?.facility.includes(Facility.WATER_FOUNTAIN)) {
      refetchWaterFountains(undefined, { revalidate: false });
    }

    await Promise.all(tasks);

    setLastUpdated(new Date().getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParameters?.facility]);

  useEffect(() => {
    if (
      (informationHasError || statusHasError || waterFountainsHasError) &&
      !hasLoggedError
    ) {
      setHasLoggedError(true);
      onError(
        informationHasError || statusHasError || waterFountainsHasError,
        "",
        {} as never,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [informationHasError, statusHasError, waterFountainsHasError]);

  return {
    lastUpdated,
    stations,
    waterFountains,
    refetch,
    isLoading:
      isLoadingStatus ||
      isLoadingInformation ||
      isLoadingWaterFountains ||
      isValidatingInformation ||
      isValidatingStatus ||
      isValidatingWaterFountains,
  };
}

export function useIsFirstRender() {
  const firstRenderRef = useRef(true);

  if (firstRenderRef.current === true) {
    firstRenderRef.current = false;
    return true;
  }

  return firstRenderRef.current;
}

export function useIsMobile() {
  return useCallback(() => window.innerWidth < 768, []);
}
