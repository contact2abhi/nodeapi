const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { schema, model } = require('../schema');

//Post Method
router.post('/:model/post', async (req, res) => {    
    try
    {
        const dschema = schema(req.body);
        const Model = model(req.params.model, dschema);
        const data = new Model(req.body);
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error)
    {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/:model/getAll',async (req, res) => {
    try{
        const Model = model(req.params.model);
        const data = await Model.find();
        res.json(data)
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/:model/getOne/:id', async (req, res) => {
    try{
        const Model = model(req.params.model);
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error)
    {
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/:model/update/:id',async (req, res) => {
    try 
    {
        const dschema = schema(req.body);
        const Model = model(req.params.model, dschema);
        const result = await Model.findByIdAndUpdate(req.params.id, req.body, { new: false });
        res.send(result);
    }
    catch (error) 
    {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/:model/delete/:id',async (req, res) => {
    try 
    {
        const Model = model(req.params.model);
        const data = await Model.findByIdAndDelete(req.params.id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) 
    {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;