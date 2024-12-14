import React, { createContext, useContext } from "react";
import ColyseusManagerInstance, { ColyseusManager } from "./ColyseusManager";

const ColyseusContext = createContext<ColyseusManager | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <ColyseusContext.Provider value={ColyseusManagerInstance}>{children}</ColyseusContext.Provider>;
};

export const useColyseus = () => {
	const context = useContext(ColyseusContext);
	if (!context) {
		throw new Error("ColyseusContext must be used within a ColyseusContext.Provider");
	}
	return context;
};
