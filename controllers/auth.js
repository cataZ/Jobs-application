const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors') //no hace falta especificar el archivo ya que en la carpeta /errors, tenemos el index que lo deriva.

const register = async (req, res) => {
	const user = await User.create({ ...req.body })
	const token = user.createJWT()

	res.status(StatusCodes.CREATED).json({
		user: { name: user.name },
		token,
	})
}

const login = async (req, res) => {
	res.send('login user')
}

module.exports = {
	register,
	login,
}
