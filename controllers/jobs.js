const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadrequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
	res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}

const getSingleJob = async (req, res) => {
	//job nos llega desde los parametros de la request
	//user nos llega desde el middleware

	// user:{userID}= nested destructuring, id sale de la route jobs/:id
	const {
		user: { userId },
		params: { id: jobId },
	} = req

	const job = await Job.findOne({
		_id: jobId,
		createdBy: userId,
	})
	if (!job) {
		throw new NotFoundError(`No job with id: ${jobId}`)
	}
	res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
	//el user id es el que creamos con la payload de la JWT exitosa.
	req.body.createdBy = req.user.userId
	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
	const {
		body: { company, position },
		user: { userId },
		params: { id: jobId },
	} = req

	if (company === '' || position === '') {
		throw new BadrequestError('Company and/or Position field cant be empty')
	}
	const job = await Job.findByIdAndUpdate(
		{
			_id: jobId,
			createdBy: userId,
		},
		req.body,
		{ new: true, runValidators: true }
	)
	if (!job) {
		throw new NotFoundError(`No job with id: ${jobId}`)
	}
	res.status(StatusCodes.OK).json({ job })
}
const deleteJob = async (req, res) => {
	const {
		body: { company, position },
		user: { userId },
		params: { id: jobId },
	} = req
	const job = await Job.findByIdAndRemove({
		_id: jobId,
		createdBy: userId,
	})
	if (!job) {
		throw new NotFoundError(`No job with id: ${jobId}`)
	}
	res.status(StatusCodes.OK).send()
}

module.exports = {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob,
}
