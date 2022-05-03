import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const GardenContext = createContext();

const GardenProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [garden, setGarden] = useState(null);
  const [myFlowers, setMyFlowers] = useState(null);

  return (
    <GardenContext.Provider
      value={{ user, setUser, garden, setGarden, myFlowers, setMyFlowers }}
    >
      {children}
    </GardenContext.Provider>
  );
};

export const GardenState = () => {
  return useContext(GardenContext);
};

export default GardenProvider;
