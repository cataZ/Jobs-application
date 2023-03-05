const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please provide name'],
		minLength: 3,
		maxLength: 25,
	},
	email: {
		type: String,
		require: [true, 'Please provide email'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide valid email',
		],
		unique: true,
	},
	password: {
		type: String,
		require: [true, 'Please provide password'],
		minLength: 6,
		maxLength: 12,
	},
})

module.exports = mongoose.model('User', UserSchema)
