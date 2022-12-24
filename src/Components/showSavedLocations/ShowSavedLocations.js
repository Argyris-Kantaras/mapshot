import { useContext, useEffect, useState } from "react";
import InfoContext from "../../hooks/use-infoContext";
import styles from "./ShowSavedLocations.module.css";
import deleteIcon from "../../icons/trash-bin.png";
let mapCoords = [];
function ShowLocations(props) {
  const info = useContext(InfoContext);
  const data = props.places;
  const date = new Date().toDateString();
  useEffect(() => {
    if (info.mapCoords.length > 0) mapCoords = info.mapCoords;
    if (info.moveTo) props.moveTo(false);
  }, [info, props]);

  const deleteHandler = function (i) {
    if (i === 0) {
      props.savedLocations.shift();
      mapCoords.shift();
    }
    if (i > 0 && i === props.savedLocations.length - 1) {
      props.savedLocations.pop();
      mapCoords.pop();
    }
    if (i > 0 && i !== 0 && i !== props.savedLocations.length - 1) {
      props.savedLocations.splice(i, 1);
      mapCoords.splice(i, 1);
    }
    localStorage.setItem(
      `${info.user.username}-${info.user.password}/mapCoords`,
      JSON.stringify(mapCoords)
    );
    localStorage.setItem(
      `${info.user.username}-${info.user.password}/savedLocations`,
      JSON.stringify(props.savedLocations)
    );
  };

  return (
    <div className={styles.savedPlaces}>
      {data.length > 0 ? (
        data.map((place, i) => {
          return (
            <div
              onClick={(e) => {
                if (info.mapCoords[i]) props.zoom(info.mapCoords[i]);
                props.moveTo(true);
              }}
              className={styles.placeDetails}
              key={place.place_id}
              id={place.place_id}
            >
              <img
                onClick={(e) => {
                  deleteHandler(i);
                }}
                className={styles.deleteIcon}
                src={deleteIcon}
              />
              <h5>{date}</h5>
              <span>{place.address ? place.address.country : ""}</span>
              <span>
                {place.address ? place.address.village : ""}
                {place.address ? "," && place.address.city : ""}
              </span>
              <span>{place.address ? place.address.municipality : ""}</span>
            </div>
          );
        })
      ) : (
        <span className={styles.noResultsMessage}>
          No saved locations found
        </span>
      )}
    </div>
  );
}
export default ShowLocations;
