import { useContext, useEffect, useRef, useState } from "react";
import styles from "../css-modules/Sidebar.module.css";
import InfoContext from "../hooks/use-infoContext";
import getSearchLocation from "../Modules/getSearchLocation";
import reverseGeocoding from "../Modules/reverseGeocoding";
import ConfirmMessage from "./ConfirmMessage";
import MenuBar from "./Menu/MenuBar";
import MenuShowHide from "./MenuShowHide/MenuShowHide";
import Profile from "./Profile/Profile";
import ShowLocations from "./showSavedLocations/ShowSavedLocations";
import SignIn from "./Sign-in/SignIn";

let savedLocations = [];

function Sidebar(props) {
  const sideBar = useRef();
  const [dataReceived, setDataReceived] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [savedResults, setSavedResults] = useState([]);
  const [showMenuOptions, setMenuOptions] = useState({
    showAllSidebar: true,
    savedData: false,
    showProfile: false,
    showSignIn: false,
    locate: false,
  });
  const info = useContext(InfoContext);
  useEffect(() => {
    info.showSidebar.showHide
      ? (sideBar.current.style.height = "60rem")
      : (sideBar.current.style.height = "0");
    const storageData = JSON.parse(
      localStorage.getItem(
        `${info.user ? info.user.username : ""}-${
          info.user ? info.user.password : ""
        }/savedLocations`
      )
    );
    if (storageData)
      storageData.forEach((place) => {
        savedLocations.push(place);
      });
    setSavedResults(savedLocations);
  }, [info]);
  useEffect(() => {
    if (dataReceived) {
      if (info.user !== null && info.user !== undefined) {
        localStorage.setItem(
          `${info.user.username}-${info.user.password}/savedLocations`,
          JSON.stringify(savedLocations)
        );
        localStorage.setItem(
          `${info.user.username}-${info.user.password}/mapCoords`,
          JSON.stringify(props.mapCoords)
        );
      }
    }
  }, [info, dataReceived]);

  useEffect(() => {
    props.setConfirm(confirm);
    if (info.markerConfirm) setDataReceived(false);

    if (!dataReceived) {
      if (props.data.length > 0)
        reverseGeocoding(
          props.data[props.data.length - 1],
          savedLocations,
          setDataReceived
        );
    }

    props.message(false);
    setConfirm(null);
  }, [confirm, props.data, dataReceived]);

  return (
    <div ref={sideBar} className={styles.sidebar}>
      <MenuBar setTerrain={props.setTerrain} setMenuState={setMenuOptions} />
      <div ref={props.overlayRef} className={styles.overlay}>
        <ConfirmMessage confirmation={setConfirm} />
      </div>
      <div>
        {showMenuOptions.savedData ? (
          <ShowLocations
            setMenuState={setMenuOptions}
            moveTo={props.moveTo}
            zoom={props.zoom}
            places={savedResults}
            savedLocations={savedLocations}
            setPlaces={setSavedResults}
          />
        ) : (
          ""
        )}
        {showMenuOptions.showProfile ? <Profile /> : ""}

        {showMenuOptions.showSignIn ? (
          <SignIn setMenuState={setMenuOptions} />
        ) : (
          ""
        )}
      </div>

      <MenuShowHide
        showSidebarValue={showMenuOptions}
        showSideBar={setMenuOptions}
      />
    </div>
  );
}

export default Sidebar;
