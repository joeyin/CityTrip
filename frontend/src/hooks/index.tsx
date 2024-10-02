"use client";

import { Device } from "@/constants";
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
    StationStatusProps {
  active?: boolean;
  onPress?: (props: BikeStationProps) => void;
  rating?: number;
  device: Device;
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

export interface FormBody {
  [key: string]: string[];
}

export function useSearch({
  defaultFormBody = {},
}: {
  defaultFormBody?: FormBody;
}): {
  formBody: FormBody;
  lastUpdated: number | undefined;
  stations: BikeStationProps[] | undefined;
  refetch: (form: FormBody) => void;
  isLoading: boolean;
} {
  const [formBody, setFormBody] = useState<FormBody>(defaultFormBody);
  const [hasLoggedError, setHasLoggedError] = useState(false);
  const { onError } = useSWRConfig();

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
    "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information",
    null,
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
  }>("https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status", null, {
    onError: () => {},
  });

  const stations: BikeStationProps[] | undefined = useMemo(() => {
    if (!status || !information?.data?.stations) return undefined;

    return status.data.stations.map((station) => ({
      ...station,
      device: Device.BIKE_STATION,
      rating: 4,
      ...(information.data.stations.find(
        (info) => info.station_id === station.station_id,
      ) as StationInformationProps),
    }));
  }, [status, information]);

  const refetch = useCallback(async (body: FormBody) => {
    setFormBody(body);
    setHasLoggedError(false);
    await Promise.all([refetchInformation(), refetchStatus()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastUpdated = useMemo(() => {
    return status && status.last_updated * 1000;
  }, [status]);

  useEffect(() => {
    if ((informationHasError || statusHasError) && !hasLoggedError) {
      setHasLoggedError(true);
      onError(informationHasError || statusHasError, "", {} as never);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [informationHasError, statusHasError]);

  return {
    formBody,
    lastUpdated,
    stations,
    refetch,
    isLoading:
      isLoadingStatus ||
      isLoadingInformation ||
      isValidatingInformation ||
      isValidatingStatus,
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
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width < 768;
}
