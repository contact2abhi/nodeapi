const express = require('express');

const mongoDBProvider = require('../providers/mongoDBProvider');
const firebaseStoreProvider = require('../providers/firebaseStoreProvider');
const config = require('config');
const { model } = require('mongoose');

const { type: dbType } = config.database;

const router = express.Router();
//Post Method
router.post('/:model/post', async (req, res) => {    
    try
    {
        let response = {};
        switch(dbType){
            case 'mongo':
                const { createModel : mongooseModelCreate } = mongoDBProvider;
                response = await mongooseModelCreate(req.params.model, req.body);
                break;
            case 'firebase':
                const { createModel : firebaseModelCreate } = firebaseStoreProvider;
                response = await firebaseModelCreate(req.params.model, req.body);
                break;
        }
        res.status(200).json(response);
    }
    catch(error)
    {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/:model/getAll',async (req, res) => {
    try{
        let response = {};
        switch(dbType){
            case 'mongo':
                const { readModel : mongooseModelRead } = mongoDBProvider;
                response = await mongooseModelRead(req.params.model);
                break;
            case 'firebase':
                const { readModel : firebaseModelRead } = firebaseStoreProvider;
                response = await firebaseModelRead(req.params.model);
                break;
        }
        res.json(response);
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
        let response = {};
        switch(dbType){
            case 'mongo':
                const { readModelById : mongooseModelReadById } = mongoDBProvider;
                response = await mongooseModelReadById(req.params.model, req.params.id);
                break;
            case 'firebase':
                const { readModelById : firebaseModelReadById } = firebaseStoreProvider;
                response = await firebaseModelReadById(req.params.model, req.params.id);
                break;
        }
        res.json(response);
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
        let response = {};
        switch(dbType){
            case 'mongo':
                const { updateModel : mongooseModelUpdate } = mongoDBProvider;
                response = await mongooseModelUpdate(req.params.model, req.body, req.params.id);
                break;
            case 'firebase':
                const { updateModel : firebaseModelUpdate } = firebaseStoreProvider;
                response = await firebaseModelUpdate(req.params.model, req.body, req.params.id);
                break;
        }
        res.send(response);
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
        let response = {};
        switch(dbType){
            case 'mongo':
                const { deleteModel : mongooseModelDelete } = mongoDBProvider;
                response = await mongooseModelDelete(req.params.model, req.params.id);
                break;
            case 'firebase':
                const { deleteModel : firebaseModelDelete } = firebaseStoreProvider;
                response = await firebaseModelDelete(req.params.model, req.params.id);
                break;
        }
        res.send(`Document has been deleted..`)
    }
    catch (error) 
    {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;