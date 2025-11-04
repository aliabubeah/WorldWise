import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesProvider";
import { useGeolocation } from "../hooks/useGeolocation";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

// Satelite Theme
// "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
// <TileLayer
// url = "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png";
// attribution = '&copy; <a href="https://carto.com/attributions">CARTO</a>';

function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { cities } = useCities();
    const [maplat, maplng] = useUrlPosition();
    const {
        lat,
        lng,
        isLoading: isLoadingPosition,
        getPosition,
    } = useGeolocation();

    useEffect(
        function () {
            if (maplat && maplng) setMapPosition([maplat, maplng]);
        },
        [maplat, maplng]
    );

    useEffect(
        function () {
            if (lat && lng) setMapPosition([lat, lng]);
        },
        [lat, lng]
    );

    return (
        <div className={styles.mapContainer}>
            {!lat && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "loading..." : "use your position"}
                </Button>
            )}
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {cities.map(city => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
    return null;
}

// function ChangeCenter({ position }) {
//     const map = useMap();
//     map.setView(position);
// }

function ChangeCenter({ position }) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(position, map.getZoom(), {
            animate: true,
            duration: 1.5,
        });
    }, [map, position]);

    return null;
}
export default Map;
