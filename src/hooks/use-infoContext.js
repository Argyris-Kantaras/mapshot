import React from "react";

const InfoContext = React.createContext({
  markerConfirm: null,
  zoom: [],
  moveTo: false,
  coordinates: [],
  setCoordinates: [],
  mapCoords: [],
  mapTerrain: 1,
  themeValues: { theme: "light", setTheme: () => {} },
  user: {},
  setUser: () => {},
  locateMe: { locate: false, setLocate: () => {} },
  showSidebar: { showHide: true, setShowHide: () => {} },
});

export default InfoContext;
