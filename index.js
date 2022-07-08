import { app } from "#src/app.js"

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send(`Hello World!`);
});

app.get("/nodeinfo", (req, res) => {
	const d = {
		origins: ALLOWED_ORIGINS,
		post: PORT,
	}
	res.json(d);
});

app.listen(process.env.PORT || 3000, () => {
	console.warn(`App listening on http://localhost:${PORT}`);
});
