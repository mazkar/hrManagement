// UserActivityContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserActivityContext = createContext();

export const UserActivityProvider = ({ children }) => {
  const [lastActivity, setLastActivity] = useState(null);

  const updateLastActivity = () => {
    const timestamp = new Date().getTime();
    AsyncStorage.setItem("lastActivity", timestamp.toString());
    setLastActivity(timestamp);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedTimestamp = await AsyncStorage.getItem("lastActivity");
      setLastActivity(storedTimestamp ? parseInt(storedTimestamp, 10) : null);
    };

    fetchData();
  }, []);

  return (
    <UserActivityContext.Provider value={{ lastActivity, updateLastActivity }}>
      {children}
    </UserActivityContext.Provider>
  );
};

export const useUserActivity = () => {
  return useContext(UserActivityContext);
};
