const express = require('express')
const router = express.Router();

const {createTask,deleteTask} = require('../../controllers/task-controller')

router.post('/',createTask);
router.delete('/:id',deleteTask);

module.exports = router;