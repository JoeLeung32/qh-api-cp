import session from "express-session";
import createMemoryStore from "memorystore";
import cookieParser from "cookie-parser";

export const middlewareSession = (router) => {
	const MemoryStore = createMemoryStore(session);
	router.use(session({
		cookie: {maxAge: 86400000},
		store: new MemoryStore({
			checkPeriod: 86400000
		}),
		resave: false,
		secret: 'qh'
	}))
	router.use(cookieParser('qh'))
}
