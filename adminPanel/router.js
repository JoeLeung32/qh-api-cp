import express from "express";
import multer from "multer";
import cookieParser from 'cookie-parser';
import {app} from "#src/app.js";
import {IndexComponent} from "#cp/pages/index.js";
import {LoginComponent} from "#cp/pages/login.js";
import {DashboardComponent} from "#cp/pages/dashboard.js";

const router = express.Router();
const upload = multer({
	dest: 'uploads/'
});

const AdminPanel = () => {
	// For Admin Panel
	app.use('/static', express.static('./adminPanel/static'));
	app.set('views', './adminPanel/views')
	app.set('view engine', 'ejs')
	app.use(express.urlencoded({extended: false}))
	app.use(express.json())

	router.use(cookieParser('qh'))

	// Pre-load
	router.all('*', (req, res, next) => {
		next()
	})

	// Pages
	router.get('/', IndexComponent);
	router.all('/login', upload.none(), LoginComponent);
	router.get('/dashboard', DashboardComponent);

	// Generic
	router.all('*', (req, res) => {
		res.sendStatus(403);
	});
	return router;
}
export const AdminPanelPath = '/';
export const AdminPanelRouter = AdminPanel();
