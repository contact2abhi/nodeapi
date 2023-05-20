
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const config = require('config');

const { cert : certFile } = config.database.firebase;
const serviceAccount =  require(certFile);

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore();

const createModel = async (modelName, data) => {
   const Model = db.collection(modelName).doc();    
   return await Model.set({
    ...data
   });
}

const readModel = async (modelName) => {
    const Model = await db.collection(modelName).get(); 
    return Model.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { ...data, id };
    });
}

const readModelById = async (modelName, id) => {
    const Model = await db.collection(modelName).doc(id).get(); 
    console.log(Model);
    const response =  Model.data();
    return response;
}

const updateModel = async (modelName, data, id) => {
    const Model = db.collection(modelName).doc(id);    
   return await Model.set({
    ...data
   });
}

const deleteModel = async (modelName, id) => {
    const Model = db.collection(modelName).doc(id);   
    return await Model.delete(); 
}


module.exports = { createModel, readModel, readModelById, updateModel, deleteModel };