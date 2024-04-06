// File: AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPlay, setCurrentPlay] = useState(null);

  const value = {
    selectedFile,
    setSelectedFile,
    currentPlay,
    setCurrentPlay,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};