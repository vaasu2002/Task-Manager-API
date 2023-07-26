const { StatusCodes } = require('http-status-codes');
<<<<<<< HEAD
const {ManageFile} = require('../utils/common');
=======
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname,'..','tasks.json');

const readTasks = () => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
}


const saveTasks = (tasks) => {
  const data = JSON.stringify(tasks);
  fs.writeFile(dataFilePath, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Tasks saved successfully');
    }
  });
};
>>>>>>> 9993b59d3840fe4b4eaf037bc42a76a95322f286
  

const createTask = (req,res)=>{
    const task_title = req.body.task_title;
<<<<<<< HEAD
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
=======
    // const task_description = req.body.task_description;
    // const flag = req.body.flag;
    const tasks = readTasks();
    console.log(tasks)
    const id = tasks[tasks.length -1].id+1;
    const newTask = {
        id:id,
        task_title:task_title,
    };
    tasks.push(newTask);
    // saveTasks(tasks);
    return res.json(newTask);
}


module.exports = {
  createTask
>>>>>>> 9993b59d3840fe4b4eaf037bc42a76a95322f286
};