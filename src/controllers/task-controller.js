const { StatusCodes } = require('http-status-codes');
const {ManageFile} = require('../utils/common');
  

const createTask = (req,res)=>{
    const task_title = req.body.task_title;
    const task_description = req.body.task_description;
    const flag = req.body.flag || 'PENDING';
    const tasks = ManageFile.readTasks();
    const id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;
    const newTask = {
        id:id,
        task_title:task_title,
        task_description:task_description,
        flag:flag
    };
    tasks.push(newTask);
    ManageFile.saveTasks(tasks);
    return res.json(newTask);
}

const deleteTask = (req,res)=>{
  try{
    const id = req.params.id;
    let tasks = ManageFile.readTasks();
    const taskId = tasks.findIndex((task) => task.id === id);
    tasks.splice(taskId, 1);
    ManageFile.saveTasks(tasks);
    return res.json({ message: 'Task deleted successfully' });
  }catch(err){
    console.error(err);
  }
};

module.exports = {
  createTask,
  deleteTask,
};