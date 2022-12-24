import { useContext, useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import infoContext from "../hooks/use-infoContext";

let coords = [];
let reverseCoords = [];
const LocationFinder = (props) => {
  const info = useContext(infoContext);
  useEffect(() => {
    if (info.markerConfirm) {
      props.coordsOnMap.push(...coords);
      // props.setClicked(true);
      props.reverseCoords.push(...reverseCoords);
      reverseCoords = [];
      coords = [];
    }
    if (info.markerConfirm === false) {
      props.setClicked(false);
      coords.pop();
      reverseCoords.pop();
    }
  }, [info, props]);
  const map = useMapEvents({
    click(e) {
      // console.log(e.latlng.wrap());
      coords.push(Array(e.latlng.lat, e.latlng.lng));
      reverseCoords.push(Array(e.latlng.wrap().lat, e.latlng.wrap().lng));
      props.markMessage(true);
      props.setClicked(true);
    },
  });

  return null;
};
export default LocationFinder;
