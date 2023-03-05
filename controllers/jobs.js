const getAllJobs = async (req, res) => {
	res.send('get all jobs')
}
const getSingleJob = async (req, res) => {
	res.send('get single job')
}
const createJob = async (req, res) => {
	res.send('create jobs')
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
