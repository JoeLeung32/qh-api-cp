import {app} from "#src/app.js"
import {AdminPanelRouter} from "./cp/router.js";
import {AdminApiRouter} from "#src/adminAPI/router.js";

app.use('/api/admin', AdminApiRouter);
app.use('/', AdminPanelRouter);
app.all('*', (req, res) => {
	res.sendStatus(403);
});

app.listen(process.env.PORT || 3000, () => {
	console.warn(`App listening on http://localhost:${process.env.PORT || 3000}`);
});
