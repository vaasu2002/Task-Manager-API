const { StatusCodes } = require('http-status-codes');
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
  

const createTask = (req,res)=>{
    const task_title = req.body.task_title;
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
};