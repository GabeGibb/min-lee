import React, { createContext, useContext } from "react";
import WebSocketManagerInstance, { WebSocketManager } from "./WebSocketManager";

const WebSocketContext = createContext<WebSocketManager | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <WebSocketContext.Provider value={WebSocketManagerInstance}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => {
	const context = useContext(WebSocketContext);
	if (!context) {
		throw new Error("useWebSocket must be used within a WebSocketProvider");
	}
	return context;
};
