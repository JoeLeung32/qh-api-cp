import i18next from "i18next"; // i18next
import i18nextMiddleware from "i18next-http-middleware";
import FilesystemBackend from "i18next-fs-backend";
import path from "path";

export const middlewareI18n = (router) => {
	const __dirname = process.cwd();
	i18next
		.use(i18nextMiddleware.LanguageDetector)
		.use(FilesystemBackend)
		.init({
				debug: false,
				backend: {
					loadPath: path.join(__dirname, 'cp/locales/{{lng}}/{{ns}}.json'),
					addPath: path.join(__dirname, 'cp/locales/{{lng}}/{{ns}}.missing.json'),
				},
				fallbackLng: 'en',
				supportedLngs: process.env.LANGUAGE_SUPPORTED.split(','),
				load: 'currentOnly',
				preload: process.env.LANGUAGE_SUPPORTED.split(','),
				defaultNs: 'translations',
				ns: ['translations', 'error', 'login', 'dashboard']
			}
		)

	router.use(i18nextMiddleware.handle(i18next))
}
