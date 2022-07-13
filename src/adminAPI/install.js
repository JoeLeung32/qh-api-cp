import {container} from "#utils/container.js";
import {knex} from "#utils/database/index.js";
import {passwordCrypt} from "#utils/bcrypt.js";
import {StatusCodes} from "#utils/error/errorMessage.js";

const passwordHashed = await passwordCrypt('admin');

const table = {
	patch: async () => {
		await knex.schema
			.dropTableIfExists('ap-panel-setting')
			.createTable('ap-panel-setting', (table) => {
				table.string('name')
				table.text('value')
			})
	},
	create: {
		admin: async () => {
			await knex.schema
				.dropTableIfExists('ap-admin')
				.createTable('ap-admin', (table) => {
					table.increments();
					table.string('username');
					table.string('password');
					table.timestamps();
					table.boolean('isValid');
				})
			await knex.schema
				.dropTableIfExists('ap-admin-token')
				.createTable('ap-admin-token', (table) => {
					table.increments();
					table.integer('adminId');
					table.text('token');
					table.timestamps();
					table.datetime('expiryAt');
					table.boolean('isValid');
				})
			await knex.schema
				.dropTableIfExists('ap-panel-setting')
				.createTable('ap-panel-setting', (table) => {
					table.string('name')
					table.text('value')
				})
		}
	},
	insert: {
		admin: async () => {
			await knex('ap-admin')
				.insert({
					username: 'admin',
					password: passwordHashed,
					created_at: (new Date()).toISOString(),
					isValid: true,
				})
		}
	}
}

export const Install = container(async (req, res) => {
	if (!knex) {
		throw StatusCodes.C400
	}
	try {
		// await table.patch()
		await table.create.admin()
		await table.insert.admin()
		res.status(200).json({
			message: `database install success.`
		});
	} catch (e) {
		throw new Error(`<pre>${e.message}</pre>`)
	}
})
