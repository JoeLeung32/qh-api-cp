import path from "path";
import express from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import multer from "multer";
import sassMiddleware from "node-sass-middleware";
import cookieParser from "cookie-parser";
import {app} from "#src/app.js";
import {IndexComponent} from "#cp/pages/index.js";
import {LoginComponent} from "#cp/pages/login.js";
import {DashboardComponent} from "#cp/pages/dashboard.js";

const MemoryStore = createMemoryStore(session);
const __dirname = process.cwd();
const router = express.Router();
const upload = multer({
	dest: 'uploads/'
});

const AdminPanel = () => {
	// For Admin Panel
	app.set('views', path.join(__dirname, 'adminPanel/templates'))
	app.set('view engine', 'ejs')
	router.use(cookieParser('qh'))
	router.use(session({
		cookie: {maxAge: 86400000},
		store: new MemoryStore({
			checkPeriod: 86400000
		}),
		resave: false,
		secret: 'qh'
	}))
	router.use(express.urlencoded({extended: false}))
	router.use(express.json())
	router.use(sassMiddleware({
		src: path.join(__dirname, 'adminPanel/dev/scss'),
		dest: path.join(__dirname, 'adminPanel/public/css'),
		debug: false,
		indentedSyntax: false,
		outputStyle: 'compressed',
		prefix: '/public/css',
	}))
	router.use('/public/css', express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
	router.use('/public/js', express.static(path.join(__dirname, "node_modules/rxjs/dist/bundles/")));
	router.use('/public', express.static('./adminPanel/public'));

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
