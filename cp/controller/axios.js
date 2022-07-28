import axios from "axios";

export const publicAPI = axios.create({
	baseURL: `${process.env.CP_API_ENDPOINT}api/admin/`,
	timeout: process.env.CP_API_TIMEOUT
})

export let privateAPI = axios.create({
	baseURL: `${process.env.CP_API_ENDPOINT}api/admin/`,
	timeout: process.env.CP_API_TIMEOUT
})
export const setBearerToken = (bearerToken) => {
	privateAPI = axios.create({
		baseURL: `${process.env.CP_API_ENDPOINT}api/admin/`,
		timeout: process.env.CP_API_TIMEOUT,
		headers: {
			'Authorization': 'Bearer ' + bearerToken
		}
	})
}
