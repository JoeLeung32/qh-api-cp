import { app } from "#src/app.js"

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => {
	console.warn(`App listening on http://localhost:${PORT}`);
});
