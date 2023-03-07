const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors') //no hace falta especificar el archivo ya que en la carpeta /errors, tenemos el index que lo deriva.
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
	/*
	const { name, email, password } = req.body

	//con salt y la password a hashear se crea nuestra hashed password para enviarla a la bd de forma segura.
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	//se crea un objeto tipo User de forma temporal para hacer el manejo de password.
	//hay q remover la maxLength del schema User, ya que la password Hasheada envia muchos caracteres.
	const tempUser = { name, email, password: hashedPassword }

	//... operador de spread/rest lo usamos para acceder a todos los elementos de forma individual.)
	*/ // Todo esto se realiza dentro del propio Schema que necesita el Hash.

	const user = await User.create({ ...req.body })
	res.status(StatusCodes.CREATED).json(user)
}

const login = async (req, res) => {
	res.send('login user')
}

module.exports = {
	register,
	login,
}
