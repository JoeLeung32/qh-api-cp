require('dotenv').config({
	path: '../src/env/dev.env',
	debug: process.env.NODE_ENV !== 'production',
	silent: process.env.NODE_ENV === 'production',
})

const config = {
	client: 'mysql2',
	connection: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	},
	useNullAsDefault: true,
	migrations: {
		tableName: 'knex_migrations'
	},
	seeds: {
	}
}

module.exports = {
	development: config,
	production: config,
}
