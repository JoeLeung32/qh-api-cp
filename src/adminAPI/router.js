import express from "express";
import multer from "multer";
import {Install} from "#admin/install.js";
import {PanelLogin} from "#admin/panel/login.js";
import {PanelLogout} from "#admin/panel/logout.js";
import {PanelGuard} from "#admin/panel/guard.js";

const router = express.Router();
const upload = multer();
export const AdminApiPath = '/api/admin';
export const AdminApi = () => {
	// Panel
	router.post("/panel/login", upload.none(), PanelLogin);
	router.get("/panel/logout", PanelLogout);
	router.get("/panel/guard", PanelGuard);

	// Install
	router.get('/install', Install);

	router.get('/', (req, res) => {
		res.sendStatus(403);
	});
	return router;
}
