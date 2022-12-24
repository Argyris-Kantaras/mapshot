import { useContext, useEffect, useRef } from "react";
import InfoContext from "../../hooks/use-infoContext";
import styles from "./MenuShowHide.module.css";

function MenuShowHide() {
  const containerRef = useRef();
  const info = useContext(InfoContext);
  useEffect(() => {
    info.showSidebar.showHide
      ? (containerRef.current.style.width = "100%")
      : (containerRef.current.style.width = "3rem");
  }, [info]);
  return (
    <div
      ref={containerRef}
      onClick={() => {
        if (info.showSidebar.showHide === false) {
          info.showSidebar.setShowHide(true);
        } else {
          info.showSidebar.setShowHide(false);
        }
      }}
      className={styles.container}
    >
      <div className={styles.firstLine}></div>
      <div className={styles.secondLine}></div>
      <div className={styles.thirdLine}></div>
    </div>
  );
}

export default MenuShowHide;
