const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadrequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
	res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}
const getSingleJob = async (req, res) => {
	res.send('get singe job')
}
const createJob = async (req, res) => {
	//el user id es el que creamos con la payload de la JWT exitosa.
	req.body.createdBy = req.user.userId
	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({ job })
}
const updateJob = async (req, res) => {
	res.send('update jobs')
}
const deleteJob = async (req, res) => {
	res.send('delete jobs')
}

module.exports = {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob,
}
