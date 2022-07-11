import {app} from "#src/app.js"
import {SystemInfo, SystemInfoPath} from "#utils/systemInfo.js";
import {AdminApi, AdminApiPath} from "#src/adminAPI/router.js";

app.get(SystemInfoPath, SystemInfo);
app.use(AdminApiPath, AdminApi());
app.get('/', (req, res) => {
	res.send(`Hello World!`);
});

app.listen(process.env.PORT || 3000, () => {
	console.warn(`App listening on http://localhost:${process.env.PORT || 3000}`);
});
