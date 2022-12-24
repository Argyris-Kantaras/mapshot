import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css-modules/displayMap.css";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import LocationFinder from "./LocationFinder";
import { useContext, useEffect, useRef, useState } from "react";
import InfoContext from "../hooks/use-infoContext";
import ChangeView from "./setMapNewView/ChangeView";
import LocateMe from "./Locate/LocateMe";

function DisplayMap(props) {
  const info = useContext(InfoContext);
  const mapContainer = useRef();
  const [mapClicked, setMapClicked] = useState(false);
  useEffect(() => {
    info.showSidebar.showHide
      ? (mapContainer.current.style.width = "70%")
      : (mapContainer.current.style.width = "100%");
  }, [info]);
  return (
    <div ref={mapContainer} className={"displayMap"}>
      <MapContainer
        center={[40.092255724901655, 1822.357601344262]}
        zoom={3}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {info.moveTo ? <ChangeView center={info.zoom} zoom={9} /> : ""}
        <LocationFinder
          reverseCoords={props.reverseCoords}
          setClicked={setMapClicked}
          coordsOnMap={props.coordsOnMap}
          markMessage={props.message}
        />
        <LocateMe />
        <TileLayer
          attribution={
            info.mapTerrain === 1
              ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              : "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          }
          url={
            info.mapTerrain === 1
              ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          }
        />

        {info.mapCoords.length > 0
          ? info.mapCoords.map((location, i) => {
              return (
                <Marker
                  key={i}
                  position={location}
                  icon={
                    new Icon({
                      iconUrl: markerIconPng,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                >
                  <Popup></Popup>
                </Marker>
              );
            })
          : ""}
      </MapContainer>
    </div>
  );
}

export default DisplayMap;
