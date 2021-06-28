const { json } = require('body-parser');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee.js');

//GET : localhost:9595/employees
router.get('/',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err) {res.send(docs);}
    });
});

//GET : localhost:9595/employees/:id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
       { res.status(400).send('No record with given id : '+req.params.id);}

    Employee.findById(req.params.id, (err,doc) => {
        if(!err) { res.send(doc);}
        else { console.log("Error in employee find :" +JSON.stringify(err,undefined,2));}
    });
});

//POST : localhost:9595/employees
router.post('/',(req,res)=>{
    var Emp = new Employee({
        name : req.body.name,
        position : req.body.position,
        office : req.body.office,
        salary : req.body.salary
    });
    Emp.save((err,doc) => {
        if(!err) { res.send(doc);}
        else { console.log("Error in employee Save :" +JSON.stringify(err,undefined,2));}
    });
});

//PUT : localhost:9595/employees/:id
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        { res.status(400).send('No record with given id : '+req.params.id); }

        var Emp = {
            name : req.body.name,
            position : req.body.position,
            office : req.body.office,
            salary : req.body.salary
        };
    
    Employee.findByIdAndUpdate(req.params.id, { $set: Emp },{ new : true}, (err,doc) => {
        if(!err) { res.send(doc);}
        else { console.log("Error in employee Update :" +JSON.stringify(err,undefined,2));}
    });
})

//DELETE : localhost:9595/employees/:id
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
       { res.status(400).send('No record with given id : '+req.params.id); }

    Employee.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) { res.send("Record Deleted.");}
        else { console.log("Error in employee remove :" +JSON.stringify(err,undefined,2));}
    });
})


module.exports=router;