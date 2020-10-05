const express = require('express');
const TaskRouter = express.Router();
const Task = require ('../models/task');


TaskRouter.get('/',async(req,res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks);
});

TaskRouter.get('/:id', async(req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});


TaskRouter.post('/', async(req,res) => {
    const {title, description, comments} = req.body; 
    const task = new Task({title,description,comments});
    console.log(task);
    await task.save();
    res.json({status:'Task saved'});
}); 

TaskRouter.put('/:id', async(req,res) => {
    const {title, description, comments} = req.body; 
    const newTask = {title, description, comments}; 
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'}); 

}); 


TaskRouter.delete('/:id', async(req,res)=> {
    await Task.findByIdAndRemove(req.params.id); 
    res.json({status: 'Task deleted'}); 
}); 

module.exports = TaskRouter; 

