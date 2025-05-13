const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'../data/tasks.json');
let tasks = [];

if(fs.existsSync(filePath)){
    const data = fs.readFileSync(filePath,'utf-8');
    try{
        tasks = JSON.parse(data);
    }catch(err){
        console.error('Failed to parse tasks.json:',err);
    }
}

function saveTasks(){
    fs.writeFileSync(filePath,JSON.stringify(tasks,null,2));
}
// Fetch all tasks 
exports.getAllTasks = (req,res) => {
    res.status(200).json(tasks);
};

// Fetch Single Task by ID
exports.getTaskById = (req,res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if(!task) return res.status(404).json({error:'Task Not Found'});
    res.json(task); 
}

exports.createTask = (req,res) => {
    const {title,description} = req.body;
    if(!title || !description){
       return res.status(400).json({error:'Title and Description is required'}); 
    }

    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask = {id:newId,title,description};
    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask);
}

exports.updateTask = (req,res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const {title,description} = req.body;
    if(title) task.title = title;
    if(description) task.description = description;

    saveTasks();
    res.json(task);
}

exports.deleteTask = (req,res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id == id);

    if(index === -1) return res.status(404).json({error:'Task not foun'});

    tasks.splice(index,1);
    saveTasks();
    res.json({message:'Task Deleted'});
}

