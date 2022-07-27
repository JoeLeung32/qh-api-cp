const bcrypt = require('bcrypt');

function passwordCrypt(password) {
	return new Promise(function (resolve, reject) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				reject(err)
			}
			bcrypt.hash(password, salt, function (err, hash) {
				if (err) {
					reject(err)
				}
				resolve(hash)
			})
		})
	})
}

exports.seed = function (knex) {
	return knex('ap-admin')
		.where({
			username: 'admin'
		})
		.first()
		.then(function(accounts) {
			if (!accounts) {
				return knex('ap-admin')
					.then(function () {
						return passwordCrypt('admin')
							.then(function (hash) {
								return knex('ap-admin')
									.insert({
										username: 'admin',
										password: hash,
										createdAt: new Date(),
										isValid: true,
									})
							})
					});
			}
		})
};
