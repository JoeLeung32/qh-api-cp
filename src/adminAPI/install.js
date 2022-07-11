import {container} from "#utils/util.js";
import {knex} from "#utils/database/index.js";
import {passwordCrypt} from "#utils/bcrypt.js";

const passwordHashed = await passwordCrypt('admin');

const table = {
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
		res.sendStatus(400);
		return;
	}
	try {
		await table.create.admin()
		await table.insert.admin()
		res.status(200).json({
			message: `database install success.`
		});
	} catch (e) {
		res.status(500).send(`<pre>${e.message}</pre>`);
	}
})
