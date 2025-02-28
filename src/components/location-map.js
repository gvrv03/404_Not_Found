"use client"

import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LocationMap({
  items = [],
  initialCenter = { lat: 34.0522, lng: -118.2437 },
  initialZoom = 16,
  onMarkerClick = null,
  height = "400px",
}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadMap = async () => {
      const mapInstance = {
        setCenter: (center) => console.log("Map center set to:", center),
        setZoom: (zoom) => console.log("Map zoom set to:", zoom),
        addMarker: (position, options) => {
          console.log("Added marker at:", position, "with options:", options);
          return { id: Math.random().toString(), position };
        },
        removeMarker: (marker) => console.log("Removed marker:", marker),
      };

      setMap(mapInstance);
    };

    loadMap();

    return () => {};
  }, [mapRef]);

  useEffect(() => {
    if (!map || items.length === 0) return;

    markers.forEach((marker) => map.removeMarker(marker));

    const newMarkers = items.map((item) => {
      const position = {
        lat: item.position?.lat || initialCenter.lat + (Math.random() * 0.01 - 0.005),
        lng: item.position?.lng || initialCenter.lng + (Math.random() * 0.01 - 0.005),
      };

      return map.addMarker(position, {
        title: item.title,
        type: item.type,
        id: item.id,
      });
    });

    setMarkers(newMarkers);

    return () => {
      newMarkers.forEach((marker) => map.removeMarker(marker));
    };
  }, [map, items, initialCenter, markers]);

  const handleMarkerClick = (item) => {
    setSelectedItem(item);
    if (onMarkerClick) onMarkerClick(item);
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className="relative w-full" style={{ height }}>
      <div
        ref={mapRef}
        className="w-full h-full bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center rounded-md overflow-hidden border"
      >
        {items.map((item) => (
          <button
            key={item.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
            style={{
              left: `${item.position?.x || Math.random() * 70 + 15}%`,
              top: `${item.position?.y || Math.random() * 70 + 15}%`,
            }}
            onClick={() => handleMarkerClick(item)}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${item.type === "lost" ? "bg-orange-500" : "bg-green-500"} text-white shadow-md group-hover:scale-110 transition-transform`}
            >
              <MapPin className="h-4 w-4" />
            </div>
          </button>
        ))}
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="bg-background/90">
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {selectedItem && (
        <div className="absolute bottom-4 right-4 w-full max-w-sm">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div>
                <Badge className={selectedItem.type === "lost" ? "bg-orange-500" : "bg-green-500"}>
                  {selectedItem.type === "lost" ? "Lost" : "Found"}
                </Badge>
                <CardTitle className="mt-2">{selectedItem.title}</CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={closeItemDetails}>
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedItem.location}</span>
                </div>
                <div className="text-sm text-muted-foreground">Reported {selectedItem.time}</div>
                <div className="pt-2">
                  <Button className="w-full" size="sm" asChild>
                    <a href={`/items/${selectedItem.id}`}>View Details</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
