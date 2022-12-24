import { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import InfoContext from "../../hooks/use-infoContext";

function LocateMe() {
  const info = useContext(InfoContext);
  useEffect(() => {
    info.locateMe.setLocate(false);
  }, [info]);
  const map = useMap();
  if (info.locateMe.locate) map.locate({ setView: true });

  return null;
}
export default LocateMe;
