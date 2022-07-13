import {CPContainer} from "#cp/components/container.js";
import axios from "axios";

const POST = (req, res) => {
	const username = req.body?.username
	const password = req.body?.password
	if (!username.length || !password.length) {
		throw new Error('No info')
	}

	axios.post(process.env.CP_API_ENDPOINT + 'api/admin/panel/login', {
		username,
		password,
	})
		.then(response => {
			if (response.status !== 200) {
				throw new Error('API Status not 200')
			}

			const {token, expiry} = response.data
			res.cookie('token', token, {
				expires: new Date(expiry),
				path: '/',
				secure: true,
				signed: true,
			})
			res.redirect('/')
		})
}

export const LoginComponent = CPContainer(async (req, res, next) => {
	switch (req.method) {
		case 'POST': {
			POST(req, res);
			break
		}
		default: {
			res.render('login')
			break;
		}
	}
})
