exports.up = function (knex) {
	return knex.schema
		// ap-admin
		.dropTableIfExists('ap-admin')
		.createTable('ap-admin', table => {
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
		// ap-admin-token
		.dropTableIfExists('ap-admin-token')
		.createTable('ap-admin-token', table => {
			table.increments()
			table.integer('adminId')
				.unsigned()
				.index()
				.references('id')
				.inTable('ap-admin')
			table.text('token')
			table.timestamps({
				useTimestamps: true,
				defaultToNow: true,
				useCamelCase: true,
			})
			table.timestamp('expiryAt').defaultTo(knex.fn.now())
			table.boolean('isValid')
		})
		// ap-panel-setting
		.dropTableIfExists('ap-panel-setting')
		.createTable('ap-panel-setting', table => {
			table.string('name')
			table.text('value')
		})
		// ap-upload-files
		.dropTableIfExists('ap-upload-files')
		.createTable('ap-upload-files', table => {
			table.increments()
			table.string('name')
			table.string('alternativeText')
			table.string('caption')
			table.string('width')
			table.string('height')
			table.json('formats')
			table.string('hash')
			table.string('ext')
			table.string('mime')
			table.float('size')
			table.string('url')
			table.string('previewUrl')
			table.string('folderPath')
			table.timestamps({
				useTimestamps: true,
				defaultToNow: true,
				useCamelCase: true,
			})
			table.integer('createdById')
			table.integer('updatedById')
		})
		// ap-upload-files-folder-links
		.dropTableIfExists('ap-upload-files-folder-links')
		.createTable('ap-upload-files-folder-links', table => {
			table.string('fileId')
			table.text('folderId')
		})
		// ap-upload-folders
		.dropTableIfExists('ap-upload-folders')
		.createTable('ap-upload-folders', table => {
			table.increments()
			table.string('name')
			table.integer('pathId')
			table.string('path')
			table.timestamps({
				useTimestamps: true,
				defaultToNow: true,
				useCamelCase: true,
			})
			table.integer('createdById')
			table.integer('updatedById')
		})
		// ap-upload-folders-parent-links
		.dropTableIfExists('ap-upload-folders-parent-links')
		.createTable('ap-upload-folders-parent-links', table => {
			table.string('folderId')
			table.text('parentFolderId')
		})
}

exports.down = function (knex) {
	return knex.schema
		.dropTable('ap-admin')
		.dropTable('ap-admin-token')
		.dropTable('ap-panel-setting')
}
