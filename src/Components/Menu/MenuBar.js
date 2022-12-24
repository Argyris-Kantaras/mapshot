import { useContext, useEffect, useRef, useState } from "react";
import InfoContext from "../../hooks/use-infoContext";
import styles from "./MenuBar.module.css";
import locateIcon from "../../icons/locate.png";

function MenuBar(props) {
  const themeRef = useRef();
  const buttonsRef = useRef();
  const authBtns = useRef();
  const mapOptionsRef = useRef();
  const info = useContext(InfoContext);

  useEffect(() => {
    mapOptionsRef.current.style.display = "none";
    if (info.themeValues.theme === "light") {
      themeRef.current.style.left = "0%";
      themeRef.current.style.backgroundColor = "rgb(151, 184, 246) ";
      buttonsRef.current.style.color = "black";
      authBtns.current.style.color = "black";
    }
    if (info.themeValues.theme === "dark") {
      themeRef.current.style.left = "58%";
      themeRef.current.style.backgroundColor = "rgb(34, 244, 34)";
      buttonsRef.current.style.color = "white";
      authBtns.current.style.color = "white";
    }
  }, [info]);

  return (
    <div className={styles.menuBar}>
      <h2>Mapshot</h2>
      <img className={styles.locateIcon} alt="" src={locateIcon} />
      <div ref={buttonsRef}>
        <span onClick={() => props.setMenuState({ savedData: true })}>
          Places
        </span>
        <span onClick={() => props.setMenuState({ showProfile: true })}>
          Profile
        </span>
        <div
          onMouseOver={() => (mapOptionsRef.current.style.display = "flex")}
          onMouseLeave={() => (mapOptionsRef.current.style.display = "none")}
          className={styles.mapOptions}
        >
          <span>Map</span>
          <div ref={mapOptionsRef} className={styles.options}>
            <span onClick={() => props.setTerrain(1)}>Terrain</span>
            <span onClick={() => props.setTerrain(2)}>Satelite</span>
          </div>
        </div>
        <div className={styles.theme}>
          <label>Theme</label>
          <div
            onClick={() => {
              info.themeValues.theme === "light"
                ? info.themeValues.setTheme("dark")
                : info.themeValues.setTheme("light");
            }}
            className={styles.themeBase}
          >
            <div className={styles.themeMiddle}>
              <div ref={themeRef} className={styles.themeBtn}></div>
            </div>
          </div>
        </div>
      </div>
      <div ref={authBtns} className={styles.authBtns}>
        <span onClick={() => info.locateMe.setLocate(true)}>Locate</span>
        {info.user !== undefined && info.user !== null ? (
          <span onClick={() => window.location.reload()}>Sign-out</span>
        ) : (
          <span onClick={() => props.setMenuState({ showSignIn: true })}>
            Sign-in
          </span>
        )}
      </div>
    </div>
  );
}

export default MenuBar;
