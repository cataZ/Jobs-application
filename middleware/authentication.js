const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
	//check headers
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('Authentication invalid')
	}
	const token = authHeader.split(' ')[1]

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)

		/*  Otra forma de cargar al usuario actual, agarrando sus datos desde la DB
		const user = User.findById(payload.id).select('-password')
		req.user = user
		*/

		//agregar usuario a la ruta de jobs
		req.user = { userId: payload.userId, name: payload.name }
		next()
	} catch (error) {
		throw new UnauthenticatedError('Authentication invalid')
	}
}

module.exports = auth
