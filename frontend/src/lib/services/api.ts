const BASE_URL = "http://localhost:5000";

async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, options);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("API call failed:", error);
		throw error;
	}
}

export async function getData(endpoint: string): Promise<any> {
	return apiFetch(endpoint);
}

export async function postData(endpoint: string, data: any): Promise<any> {
	return apiFetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
}

export async function putData(endpoint: string, data: any): Promise<any> {
	return apiFetch(endpoint, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
}

export async function deleteData(endpoint: string): Promise<any> {
	return apiFetch(endpoint, {
		method: "DELETE",
	});
}
