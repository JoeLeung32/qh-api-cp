import {app} from "#src/app.js"
import {SystemInfo, SystemInfoPath} from "#utils/systemInfo.js";
import {AdminPanelPath, AdminPanelRouter} from "./cp/router.js";
import {AdminApiPath, AdminApiRouter} from "#src/adminAPI/router.js";

app.get(SystemInfoPath, SystemInfo);
app.use(AdminApiPath, AdminApiRouter);
app.use(AdminPanelPath, AdminPanelRouter);
app.all('*', (req, res) => {
	res.sendStatus(403);
});

app.listen(process.env.PORT || 3000, () => {
	console.warn(`App listening on http://localhost:${process.env.PORT || 3000}`);
});
