import express from "express";
import multer from "multer";
import {appGenericCORS, helmetBasic} from "#src/app.js";
import {Install} from "#admin/install.js";
import {Uploader} from "#admin/upload.js";
import {PanelLogin} from "#admin/panel/login.js";
import {PanelLogout} from "#admin/panel/logout.js";
import {PanelGuard} from "#admin/panel/guard.js";
import {PanelSetting} from "#admin/panel/settings.js";

const router = express.Router();
const upload = multer({
	dest: 'uploads/'
});
const AdminApi = () => {
	// Enhance API security
	router.use(helmetBasic);

	// CORS
	router.use(appGenericCORS)

	// Parse application/x-www-form-urlencoded
	router.use(express.urlencoded({
		extended: false
	}))

	// Parse application/json
	router.use(express.json())

	// Pre-load
	router.all('*', (req, res, next) => {
		next()
	})

	// Panel
	router.post('/panel/login', upload.none(), PanelLogin);
	router.get('/panel/logout', PanelLogout);
	router.get('/panel/guard', PanelGuard);
	router.post('/panel/setting', upload.none(), PanelSetting);

	// Uploader Example
	router.post('/upload', upload.single('single'), Uploader.single);
	router.post('/upload-multiple', upload.array('multiple'), Uploader.multiple);
	router.post('/upload-fields', upload.fields([
		{name: 'file1', maxCount: 1},
		{name: 'file2', maxCount: 2}
	]), Uploader.fields);

	// Install
	router.get('/install', Install);

	// Generic
	router.all('*', (req, res) => {
		res.sendStatus(403);
	});
	return router;
}
export const AdminApiPath = '/api/admin';
export const AdminApiRouter = AdminApi();
