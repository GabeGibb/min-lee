import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WebSocketProvider } from "./lib/websocket/WebSocketContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<WebSocketProvider>
			<App />
		</WebSocketProvider>
	</StrictMode>
);