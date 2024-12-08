import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/host/:roomId" element={<Home />} />
				<Route path="/join/:roomId" element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
