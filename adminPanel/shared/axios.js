import axios from "axios";

export const publicAPI = axios.create({
	baseURL: `${process.env.CP_API_ENDPOINT}api/admin/`,
	timeout: 1000
})

export let privateAPI = axios.create({
	baseURL: `${process.env.CP_API_ENDPOINT}api/admin/`,
	timeout: 1000
})
export const setBearerToken = (bearerToken) => {
	privateAPI = axios.create({
		baseURL: `${process.env.CP_API_ENDPOINT}api/admin/`,
		timeout: 1000,
		headers: {
			'Authorization': 'Bearer ' + bearerToken
		}
	})
}
