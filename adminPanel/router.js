import path from "path";
import express from "express";

// middleware START
import multer from "multer"; // upload
import session from "express-session"; // session
import createMemoryStore from "memorystore"; // session
import cookieParser from "cookie-parser"; // cookie
import sassMiddleware from "node-sass-middleware";

import i18next from "i18next"; // i18next
import i18nextMiddleware from "i18next-http-middleware";
import FilesystemBackend from "i18next-fs-backend";
// middleware END
// normal
import {app} from "#src/app.js";
import {IndexComponent} from "#cp/templates/index/index.js";
import {LoginComponent} from "#cp/templates/login/login.js";
import {LogoutComponent} from "#cp/templates/logout/logout.js";
import {DashboardComponent} from "#cp/templates/dashboard/dashboard.js";
import {AdministratorActivityHistoryComponent} from "#cp/templates/administrator/activity_history/activity_history.js";

const MemoryStore = createMemoryStore(session);
const __dirname = process.cwd();
const router = express.Router();
const upload = multer({
	dest: 'uploads/'
});

i18next
	.use(i18nextMiddleware.LanguageDetector)
	.use(FilesystemBackend)
	.init({
			debug: false,
			backend: {
				loadPath: path.join(__dirname, 'adminPanel/locales/{{lng}}/{{ns}}.json'),
				addPath: path.join(__dirname, 'adminPanel/locales/{{lng}}/{{ns}}.missing.json'),
			},
			fallbackLng: 'en',
			supportedLngs: process.env.LANGUAGE_SUPPORTED.split(','),
			load: 'currentOnly',
			preload: process.env.LANGUAGE_SUPPORTED.split(','),
			defaultNs: 'translations',
			ns: ['translations', 'login', 'dashboard']
		}
	)

const AdminPanel = () => {
	// For Admin Panel
	app.set('views', path.join(__dirname, 'adminPanel/templates'))
	app.set('view engine', 'ejs')

	// Session & Cookie
	router.use(session({
		cookie: {maxAge: 86400000},
		store: new MemoryStore({
			checkPeriod: 86400000
		}),
		resave: false,
		secret: 'qh'
	}))
	router.use(cookieParser('qh'))

	// Form submission
	router.use(express.urlencoded({extended: false}))
	router.use(express.json())

	// SASS
	router.use(sassMiddleware({
		src: path.join(__dirname, 'adminPanel/dev/scss'),
		dest: path.join(__dirname, 'adminPanel/public/css'),
		debug: false,
		indentedSyntax: false,
		outputStyle: 'compressed',
		prefix: '/public/css',
	}))

	// locales
	router.use(i18nextMiddleware.handle(i18next))

	// Static files
	router.use('/public/css', express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
	router.use('/public/js', express.static(path.join(__dirname, "node_modules/rxjs/dist/bundles")));
	router.use('/public/js/fontawesome', express.static(path.join(__dirname, "node_modules/@fortawesome/fontawesome-free/js")));
	router.use('/public', express.static('./adminPanel/public'));

	// Pre-load
	router.all('*', (req, res, next) => {
		next()
	})

	// Pages
	router.get('/', IndexComponent);
	router.get('/:lng', IndexComponent);
	router.all('/:lng/login', upload.none(), LoginComponent);
	router.get('/:lng/logout', upload.none(), LogoutComponent);
	router.get('/:lng/dashboard', DashboardComponent);
	router.get('/:lng/administrator/activity-history', AdministratorActivityHistoryComponent);

	// Generic
	router.all('*', (req, res) => {
		res.status(404).send('Page Not Found.');
	});
	return router;
}
export const AdminPanelPath = '/';
export const AdminPanelRouter = AdminPanel();
