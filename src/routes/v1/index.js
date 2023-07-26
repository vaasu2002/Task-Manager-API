const express = require('express');

const { InfoController } = require('../../controllers');
const {createTask} = require('../../controllers/task-controller')

const TaskRoutes = require('./task-routes')

const router = express.Router();

router.get('/info', InfoController.info);
router.post('/tasks',createTask );

module.exports = router;