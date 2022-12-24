import { useContext, useEffect, useRef, useState } from "react";
import DisplayMap from "./Components/DisplayMap";
import Sidebar from "./Components/Sidebar";
import InfoContext from "./hooks/use-infoContext";
import styles from "./MainPage.module.css";

const geoCoords = [];
let coordsOnMap = [];

function MainPage() {
  const [markerConfirm, setMarkerConfirm] = useState(null);
  const [markMessage, setMarkMessage] = useState(false);
  const [reverseCoords, setReverseCoords] = useState([]);
  const [mapCoords, setMapCoords] = useState([]);
  const [theme, setTheme] = useState("light");
  const [zoom, setZoom] = useState([39.9822, 1825.4012]);
  const [moveToLocations, setMoveToLocation] = useState(false);
  const [terrain, setTerrain] = useState(1);
  const [authorize, setAuthorize] = useState();
  const [locate, setLocate] = useState(false);
  const [showHideSidebar, setShowHideSidebar] = useState(true);
  const overlayRef = useRef();
  const mainPageRef = useRef();

  useEffect(() => {
    markMessage
      ? (overlayRef.current.style.display = "block")
      : (overlayRef.current.style.display = "none");

    theme === "light"
      ? (mainPageRef.current.style.backgroundImage =
          "linear-gradient(to  right,rgb(121, 162, 238) 5%,rgb(223, 223, 223) 10%)")
      : (mainPageRef.current.style.backgroundImage =
          "linear-gradient(to  right,rgb(34, 244, 34) 2%,rgb(93, 92, 92) 10%)");
    if (geoCoords.length > 0) setReverseCoords(geoCoords);
    if (coordsOnMap.length > 0) setMapCoords(coordsOnMap);
  }, [markMessage, theme]);

  useEffect(() => {
    const savedMapCoords = JSON.parse(
      localStorage.getItem(
        `${authorize ? authorize.username : ""}-${
          authorize ? authorize.password : ""
        }/mapCoords`
      )
    );
    if (savedMapCoords)
      savedMapCoords.forEach((coords) => {
        coordsOnMap.push(coords);
      });
    if (coordsOnMap.length > 0) setMapCoords(coordsOnMap);
  }, [authorize]);

  return (
    <div>
      <InfoContext.Provider
        value={{
          markerConfirm: markerConfirm,
          zoom: zoom,
          moveTo: moveToLocations,
          mapEvent: false,
          coordinates: reverseCoords,
          themeValues: { theme, setTheme },
          mapCoords: mapCoords,
          mapTerrain: terrain,
          user: authorize,
          setUser: setAuthorize,
          locateMe: { locate, setLocate },
          showSidebar: {
            showHide: showHideSidebar,
            setShowHide: setShowHideSidebar,
          },
        }}
      >
        <div ref={mainPageRef} className={styles.mainPage}>
          <Sidebar
            data={reverseCoords}
            overlayRef={overlayRef}
            message={setMarkMessage}
            setConfirm={setMarkerConfirm}
            zoom={setZoom}
            moveTo={setMoveToLocation}
            setTerrain={setTerrain}
            mapCoords={mapCoords}
          />
          <DisplayMap
            setMapCoords={setMapCoords}
            reverseCoords={geoCoords}
            message={setMarkMessage}
            setConfirm={setMarkerConfirm}
            coordsOnMap={coordsOnMap}
          />
        </div>
      </InfoContext.Provider>
    </div>
  );
}

export default MainPage;
