import { app } from "#src/app.js"

const TEST = process.env.TEST || '-';
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
	res.send(`Hello World! ${PORT} [${TEST}]`);
});

app.listen(process.env.PORT || 3000, () => {
	console.warn(`App listening on http://localhost:${PORT}`);
});
