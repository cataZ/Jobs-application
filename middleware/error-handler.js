// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
	let customError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong',
	}

	// if (err instanceof CustomAPIError) {
	// 	return res.status(err.statusCode).json({ msg: err.message })
	// }

	//cuando no ingreso valores en la password a la hora de registrarme, devuelve un object err. vacio la unica forma que encontre de manipularlo fue asi.
	if (Object.keys(err).length === 0) {
		customError.msg = 'No se ingresaron valores validos para la password'
		customError.statusCode = 400
	}

	if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(',')
		customError.statusCode = 400
	}

	if (err.code && err.code == 11000) {
		customError.msg = `Duplicate value for ${Object.keys(
			err.keyValue
		)} field, please enter other value`
		customError.statusCode = 400
	}

	if (err.name === 'CastError') {
		customError.msg = `No item found with id: ${err.value}`
		customError.statusCode = 404
	}

	// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
	//esta parte no hace falta, la usmaos para debuggear en postman
	return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
