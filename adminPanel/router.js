import express from "express";
import cookieParser from 'cookie-parser';
import {app} from "#src/app.js";
import {IndexComponent} from "#cp/pages/index.js";
import {LoginComponent} from "#cp/pages/login.js";
import {DashboardComponent} from "#cp/pages/dashboard.js";

const router = express.Router();

const AdminPanel = () => {
	// For Admin Panel
	app.use('/static', express.static('./adminPanel/static'));
	app.set('views', './adminPanel/views')
	app.set('view engine', 'ejs')

	router.use(cookieParser('qh'))

	// Pre-load
	router.all('*', (req, res, next) => {
		next()
	})

	// Pages
	router.get('/', IndexComponent);
	router.get('/login', LoginComponent);
	router.get('/dashboard', DashboardComponent);

	// Generic
	router.all('*', (req, res) => {
		res.sendStatus(403);
	});
	return router;
}
export const AdminPanelPath = '/';
export const AdminPanelRouter = AdminPanel();
