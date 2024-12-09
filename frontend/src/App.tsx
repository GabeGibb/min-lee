import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import PlayerRoom from "./pages/player";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/room/:roomId" element={<PlayerRoom />} />
				{/* <Route path="/join/:roomId" element={<Home />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
