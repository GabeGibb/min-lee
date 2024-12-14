import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://localhost:5000", // Replace with your base URL or use an environment variable
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosClient;
