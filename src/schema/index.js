const mongoose = require('mongoose');

const schemaGenerator = (obj) => {
    console.log(obj);
    let schema = {};
    Object.keys(obj).forEach(k => {
        console.log(k);
        schema[k] = {
            required: false,
            type: getType(obj[k])
        }
    });
    console.log(schema);
    return new mongoose.Schema(schema, { strict: false });
}

const getType = (value) => {
    return typeof value;
}

const modelGenerator = (name, dataSchema) => {
    let model;
    if(mongoose.modelNames().includes(name))
    {
        model = mongoose.models[name];
    }
    else{
        dataSchema = dataSchema ?? new mongoose.Schema();;
        model = mongoose.model(name, dataSchema);
    }
    return model;
}

module.exports = { schema: (data) => { return schemaGenerator(data)}, model: modelGenerator };
