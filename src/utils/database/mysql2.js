import {createRequire} from 'module';
import {attachPaginate} from "knex-paginate";

const require = createRequire(import.meta.url);
attachPaginate();

export const mysql2 = () => {
	return require('knex')({
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME
		},
		pool: { min: 0, max: 7 }
	});
}
