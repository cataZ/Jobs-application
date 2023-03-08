const getAllJobs = async (req, res) => {
	res.send('get all jobs')
}
const getSingleJob = async (req, res) => {
	res.send('get singe job')
}
const createJob = async (req, res) => {
	res.json(req.user)
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
