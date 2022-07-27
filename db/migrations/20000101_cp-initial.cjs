exports.up = function (knex) {
	return knex.schema
		.dropTableIfExists('ap-admin')
		.dropTableIfExists('ap-admin-token')
		.dropTableIfExists('ap-panel-setting')
		.createTable('ap-admin', (table) => {
			table.increments()
			table.string('username')
			table.string('password')
			table.timestamps({
				useTimestamps: true,
				defaultToNow: true,
				useCamelCase: true,
			})
			table.boolean('isValid')
		})
		.createTable('ap-admin-token', (table) => {
			table.increments();
			table.integer('adminId');
			table.text('token');
			table.timestamps({
				useTimestamps: true,
				defaultToNow: true,
				useCamelCase: true,
			});
			table.timestamp('expiryAt').defaultTo(knex.fn.now());
			table.boolean('isValid');
		})
		.createTable('ap-panel-setting', (table) => {
			table.string('name')
			table.text('value')
		})
};

exports.down = function (knex) {
	return knex.schema
		.dropTable('ap-admin')
		.dropTable('ap-admin-token')
		.dropTable('ap-panel-setting')
};
