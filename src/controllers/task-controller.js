const { StatusCodes } = require('http-status-codes');
const {ManageFile} = require('../utils/common');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const {Enums} = require('../utils/common')

/*
  POST /tasks
  req-body {task_title: 'Task Title', task_description: Task Description, flag: 'PENDING'}
*/
const createTask = (req,res)=>{
  try{
    const task_title = req.body.task_title;
    const task_description = req.body.task_description;
    const priority = req.body.priority || Enums.PRIORITY_LEVEL.LOW; // default is low
    const flag = req.body.flag || Enums.FLAG_TYPES.PENDING; // default is pending
    const tasks = ManageFile.readTasks();
    const id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1; // generate id
    const newTask = {
        id:id,
        task_title:task_title,
        task_description:task_description,
        priority:priority, 
        flag:flag,
        createDate: new Date().toISOString().split('T')[0]
    };
    tasks.push(newTask);
    ManageFile.saveTasks(tasks);
    SuccessResponse.data = newTask;
    return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);

  }catch(error){
    ErrorResponse.error = error;
    return res  
            .status(error.statusCode)
            .json(ErrorResponse);
  }
}


/*
  DELETE /tasks/:id
  req.params.id = 6
*/
const deleteTask = (req,res)=>{
  try{
    const id = parseInt(req.params.id);
    let tasks = ManageFile.readTasks();
    const taskIndex  = tasks.findIndex((task) => task.id === id);
    // Check if the task with the specified ID exists
    if(taskIndex === -1){
      ErrorResponse.error = new AppError('Task not found',StatusCodes.NOT_FOUND);
      return res
          .status(StatusCodes.NOT_FOUND)
          .json(ErrorResponse);
    }

    tasks.splice(taskIndex , 1); // remove task 
    ManageFile.saveTasks(tasks);
    SuccessResponse.message = 'Tasks deleted successfully';
    SuccessResponse.data = taskIndex ;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
  }catch(error){
    console.log(error)
    ErrorResponse.error = error;
    return res
            .status(error.statusCode)
            .json(ErrorResponse);
  }
};


// GET /tasks
const getAllTasks = (req,res)=>{
  try{
    let tasks = ManageFile.readTasks();
    const sortByDate = req.query.sortByDate;
    const flagStatus = req.query.flagStatus;
    if(flagStatus){
      tasks = tasks.filter((task) => task.flag === flagStatus);
    }
    // default in acsending order
    if(sortByDate === 'asc' || !sortByDate) {
      tasks.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));
    }else if(sortByDate === 'desc'){
      tasks.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    }
    SuccessResponse.data = tasks;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
  }catch(error){
    ErrorResponse.error = error;
    return res
            .status(error.statusCode)
            .json(ErrorResponse);
  }
};


/*
  GET /tasks/:id
  req.params.id = 6
*/
const getTaskById = (req,res)=>{
  try{
    const id = parseInt(req.params.id);
    let tasks = ManageFile.readTasks();
    const task = tasks.find(
      (task) => 
      task.id === id
    );
    if(!task){
      ErrorResponse.error = new AppError('Task not found',StatusCodes.NOT_FOUND);
      return res
          .status(StatusCodes.NOT_FOUND)
          .json(ErrorResponse);
    }
    SuccessResponse.data = task;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
  }catch(error){
    ErrorResponse.error = error;
    return res
            .status(error.statusCode)
            .json(ErrorResponse);
  }
}


/*
  PUT /tasks/:id
  req.params.id = 6
*/
const updateTask = (req,res)=>{
  try{
    const id = parseInt(req.params.id);
    const updatedTaskData = req.body;
    let tasks = ManageFile.readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if(taskIndex === -1){
      ErrorResponse.error = new AppError('Task not found',StatusCodes.NOT_FOUND);
      return res
          .status(StatusCodes.NOT_FOUND)
          .json(ErrorResponse);
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTaskData };

    ManageFile.saveTasks(tasks);
    SuccessResponse.data = tasks[taskIndex];
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
  }catch(err){
    ErrorResponse.error = error;
    return res
            .status(error.statusCode)
            .json(ErrorResponse);
  }
}


const getTasksByPriority = (req,res)=>{
  try{
    const priority = req.params.level.toUpperCase();
    let tasks = ManageFile.readTasks();
    tasks = tasks.filter((task) => task.priority === priority);
    if(tasks.length === 0){
      ErrorResponse.error = new AppError('Task not found',StatusCodes.NOT_FOUND);
      return res
          .status(StatusCodes.NOT_FOUND)
          .json(ErrorResponse);
    }
    SuccessResponse.data = tasks;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
  }catch(error){
    ErrorResponse.error = error;
    return res
            .status(error.statusCode)
            .json(ErrorResponse);
  }
}

module.exports = {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
  getTasksByPriority
};