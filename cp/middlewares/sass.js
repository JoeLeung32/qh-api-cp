import path from "path";
import sassMiddleware from "node-sass-middleware";

export const middlewareSass = (router) => {
	const __dirname = process.cwd();
	router.use(sassMiddleware({
		src: path.join(__dirname, 'cp/dev/scss'),
		dest: path.join(__dirname, 'cp/public/css'),
		debug: false,
		indentedSyntax: false,
		outputStyle: 'compressed',
		prefix: '/public/css',
	}))
}
