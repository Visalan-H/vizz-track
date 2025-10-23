const router = require('express').Router();
const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobController');
const { validateJob, validateJobUpdate } = require('../validations/jobValidations');
const { decodeToken } = require('../middleware/authMiddleware');

router.post('/', decodeToken, validateJob, createJob);
router.get('/', decodeToken, getAllJobs);
router.get('/:id', decodeToken, getJobById);
router.put('/:id', decodeToken, validateJobUpdate, updateJob);
router.delete('/:id', decodeToken, deleteJob);

module.exports = router;