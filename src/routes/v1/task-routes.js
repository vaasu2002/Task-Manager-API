const express = require('express');

const { InfoController } = require('../../controllers');
const {createTask,deleteTask, getAllTasks, getTaskById,updateTask,getTasksByPriority} = require('../../controllers/task-controller')
const {TaskMiddlewares} = require('../../middlewares')
// const TaskRoutes = require('./task-routes')

const router = express.Router();

router.post('/', TaskMiddlewares.validateCreateRequest,createTask);
router.delete('/:id',deleteTask);
router.get('/',getAllTasks);
router.get('/:id',getTaskById);
router.put('/:id',TaskMiddlewares.validateUpdateRequest,updateTask);

router.get('/priority/:level',TaskMiddlewares.validatePriorityRequest,getTasksByPriority);

module.exports = router;