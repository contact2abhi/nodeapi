const mongoose = require('mongoose');
const { schema, model } = require('../schema');

const createModel = async (modelName, data) => {
    const dschema = schema(data);
    const Model = model(modelName, dschema);
    const mData = new Model(data);
   return await mData.save();
}

const readModel = async (modelName) => {
    const Model = model(modelName);
    return await Model.find();
}

const readModelById = async (modelName, id) => {
    const Model = model(modelName);
    return await Model.findById(id);
}

const updateModel = async (modelName, data, id) => {
    const dschema = schema(data);
    const Model = model(modelName, dschema);
    return await Model.findByIdAndUpdate(id, data, { new: false });
}

const deleteModel = async (modelName, id) => {
    const Model = model(modelName);
    return await Model.findByIdAndDelete(id);
}


module.exports = { createModel, readModel, readModelById, updateModel, deleteModel };