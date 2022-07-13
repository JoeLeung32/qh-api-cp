import {app} from "#src/app.js"
import {SystemInfo, SystemInfoPath} from "#utils/systemInfo.js";
import {AdminPanelPath, AdminPanelRouter} from "./adminPanel/router.js";
import {AdminApiPath, AdminApiRouter} from "#src/adminAPI/router.js";

app.get(SystemInfoPath, SystemInfo);
app.use(AdminPanelPath, AdminPanelRouter);
app.use(AdminApiPath, AdminApiRouter);
app.get('/', (req, res) => {
	res.send(`Hello World!`);
});

app.listen(process.env.PORT || 3000, () => {
	console.warn(`App listening on http://localhost:${process.env.PORT || 3000}`);
});
