const express = require('express')
const router = express.Router();

<<<<<<< HEAD
const {createTask,deleteTask} = require('../../controllers/task-controller')

router.post('/',createTask);
router.delete('/:id',deleteTask);
=======
const {createTask} = require('../../controllers/task-controller')

router.post('/',createTask);
>>>>>>> 9993b59d3840fe4b4eaf037bc42a76a95322f286

module.exports = router;