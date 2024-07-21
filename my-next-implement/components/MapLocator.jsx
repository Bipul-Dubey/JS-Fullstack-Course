import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "700px",
  height: "700px",
};

const center = { lat: 41.9028, lng: 12.4964 }; // Centered on Rome

export function MapLocator({ locations = [] }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GCP_KEY,
  });

  const [mapRef, setMapRef] = useState();
  const [directions, setDirections] = useState(null);

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations?.forEach((loc) => bounds.extend({ lat: loc.lat, lng: loc.lng }));
    map.fitBounds(bounds);
    setMapRef(map);

    // directions
    const directionsService = new google.maps.DirectionsService();
    const promises = locations.slice(0, -1).map((location, index) => {
      const origin = location;
      const destination = locations[index + 1];
      return new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              resolve(result);
            } else {
              reject(`Error fetching directions ${result}`);
            }
          }
        );
      });
    });
    Promise.all(promises)
      .then((results) => setDirections(results))
      .catch((error) => console.error(error));
  };

  const getStrokeColor = (index) => {
    if (
      locations[index].status === "completed" &&
      locations[index + 1].status === "completed"
    ) {
      return "#008000"; // Green for completed routes
    }
    if (
      (locations[index].status === "completed" &&
        locations[index + 1].status === "current") ||
      (locations[index].status === "current" &&
        locations[index + 1].status === "pending")
    ) {
      return "#0000FF"; // Dotted blue for current to pending
    }
    if (locations[index + 1].status === "pending") {
      return "#00008B"; // Dark blue for pending routes
    }
    return "#f50e0e"; // Default to black
  };

  return isLoaded && typeof window != undefined ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        keyboardShortcuts: false,
      }}
    >
      {locations?.map((location, index, locations) => (
        <Marker
          key={"marker" + index}
          position={{
            lat: location?.lat,
            lng: location?.lng,
          }}
          icon={
            index == 0
              ? {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "white",
                  fillOpacity: 1,
                  strokeColor: "#cb0a0a",
                  strokeOpacity: 1,
                  strokeWeight: 5,
                  scale: 8,
                }
              : index == locations.length - 1
              ? {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "white",
                  fillOpacity: 1,
                  strokeColor: "#ffff00",
                  strokeOpacity: 1,
                  strokeWeight: 5,
                  scale: 8,
                }
              : location.status == "current"
              ? {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "white",
                  fillOpacity: 1,
                  strokeColor: "#1890FF",
                  strokeOpacity: 1,
                  strokeWeight: 5,
                  scale: 8,
                }
              : location.status == "completed"
              ? {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "white",
                  fillOpacity: 1,
                  strokeColor: "#1b7400",
                  strokeOpacity: 1,
                  strokeWeight: 5,
                  scale: 8,
                }
              : {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "white",
                  fillOpacity: 1,
                  strokeColor: "#03278a",
                  strokeOpacity: 1,
                  strokeWeight: 5,
                  scale: 8,
                }
          }
        />
      ))}
      {directions?.map((directions, index) => (
        <DirectionsRenderer
          key={"directions" + index}
          options={{
            suppressMarkers: true,
            directions: directions,
            polylineOptions: {
              strokeColor: getStrokeColor(index),
              strokeOpacity:
                (locations[index].status === "completed" &&
                  locations[index + 1].status === "current") ||
                (locations[index].status === "current" &&
                  locations[index + 1].status === "pending")
                  ? 0.5
                  : 1,
              strokeWeight: 4,
              ...(((locations[index].status === "completed" &&
                locations[index + 1].status === "current") ||
                (locations[index].status === "current" &&
                  locations[index + 1].status === "pending")) && {
                icons: [
                  {
                    icon: {
                      path: "M 0,-1 0,1",
                      strokeOpacity: 1,
                      scale: 4,
                    },
                    offset: "0",
                    repeat: "20px",
                  },
                ],
              }),
            },
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
