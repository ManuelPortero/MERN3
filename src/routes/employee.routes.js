 
const express = require ( 'express');
const EmployeeRoute = express.Router(); // este metodo devuelve un objeto del cual voy a poder ingresar rutas. 
const Employee = require('../models/employee');


EmployeeRoute.get('/',async (req,res) => {
      const employees = await Employee.find();
      console.log(employees);
      res.json(employees);
});

EmployeeRoute.get ('/:id', async (req,res) => {
    const employee = await Employee.findById(req.params.id); 
    res.json(employee); 
});


EmployeeRoute.post('/', async (req,res) =>{ 
    const {name,surname,telephone,email,position} = req.body;
    const employee = new Employee({name,surname,telephone,email,position}); 
    console.log(employee);
    await employee.save();
    res.json({status:'Employee saved'});
});

EmployeeRoute.put('/:id', async (req, res) => {
    const {name,surname,telephone,email,position} = req.body; 
    const newEmployee = {name,surname,telephone,email,position}; 
    await Employee.findByIdAndUpdate(req.params.id, newEmployee);
    res.json({status: 'Employee Updated'});
}); 

EmployeeRoute.delete('/:id', async (req, res) => {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({status: 'Employee deleted'});
});

module.exports = EmployeeRoute;
