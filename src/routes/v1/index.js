const express = require('express');

const { InfoController } = require('../../controllers');
const {createTask} = require('../../controllers/task-controller')

const TaskRoutes = require('./task-routes')

const router = express.Router();

router.get('/info', InfoController.info);
<<<<<<< HEAD
router.post('/tasks', TaskRoutes);
=======
router.post('/tasks',createTask );
>>>>>>> 9993b59d3840fe4b4eaf037bc42a76a95322f286

module.exports = router;