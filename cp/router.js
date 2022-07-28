import path from "path";
import express from "express";

// middleware START
import multer from "multer";
import {middlewareSession} from "#cp/middlewares/session.js";
import {middlewareSass} from "#cp/middlewares/sass.js";
import {middlewareI18n} from "#cp/middlewares/i18n.js";
// middleware END
// normal
import {app} from "#src/app.js";
import {Error404Component} from "#cp/templates/error/404.js";
import {IndexComponent} from "#cp/templates/index/index.js";
import {LoginComponent, LoginComponentPOST} from "#cp/templates/login/login.js";
import {LogoutComponent} from "#cp/templates/logout/logout.js";
import {DashboardComponent} from "#cp/templates/dashboard/dashboard.js";
import {AdministratorActivityHistoryComponent} from "#cp/templates/administrator/activity_history/activity_history.js";

const AdminPanel = () => {
	const __dirname = process.cwd()
	const router = express.Router()
	const upload = multer({
		dest: 'uploads/'
	})
	const _staticPath = (sourcePath) => {
		return express.static(path.join(__dirname, sourcePath))
	}
	let params

	app.set('views', path.join(__dirname, 'cp/templates'))
	app.set('view engine', 'ejs')

	// middlewares
	middlewareSession(router)
	middlewareSass(router)
	middlewareI18n(router)

	// Form submission
	router.use(express.urlencoded({extended: false}))
	router.use(express.json())

	// Static files
	router.use('/public/css', _staticPath("node_modules/bootstrap/dist/css"))
	router.use('/public/js/rxjs', _staticPath("node_modules/rxjs/dist/bundles"))
	router.use('/public/js/fontawesome', _staticPath("node_modules/@fortawesome/fontawesome-free/js"))
	router.use('/public', express.static('./cp/public'))

	// Pages
	router.get('/', IndexComponent)
	router.get('/:lng', IndexComponent)
	router.route('/:lng/login')
		.get(LoginComponent)
		.post(upload.none(), LoginComponentPOST)
	router.get('/:lng/logout', LogoutComponent)
	router.get('/:lng/dashboard', DashboardComponent)
	router.get('/:lng/administrator/activity-history', AdministratorActivityHistoryComponent)

	// Generic
	router.get('/:lng/*', Error404Component)
	return router;
}
export const AdminPanelRouter = AdminPanel();
