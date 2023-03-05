const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
	const user = await User.create({ ...req.body })
	//... operador de spread/rest lo usamos para acceder a todos los elementos de forma individual.)
	//ahora nos esta llegando la pw, en forma de texto, MALA practica hay que hacerlo de una forma segura.
	res.status(StatusCodes.CREATED).json(user)
}

const login = async (req, res) => {
	res.send('login user')
}

module.exports = {
	register,
	login,
}
