import express from "express";
import path from "path";
import {appGenericCORS} from "#src/app.js";

const __dirname = process.cwd();
const router = express.Router();

const AdminPanel = () => {
	// CORS
	// router.use(appGenericCORS)

	// Pre-load
	router.all('*', (req, res, next) => {
		next()
	})

	router.all('/', (req, res) => {
		res.sendFile(path.join(__dirname, '/adminPanel/index.html'))
	});

	// Generic
	router.all('*', (req, res) => {
		res.sendStatus(403);
	});
	return router;
}
export const AdminPanelPath = '/cp';
export const AdminPanelRouter = AdminPanel();
