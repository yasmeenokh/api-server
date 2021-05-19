
'use strict'; 
/**
 * Requiring the express dependency and the clothes model class
 */
const express = require('express');
const clothesModel = require('../models/clothes');
const DataManager = require('../models/data-collection-class');
const dataManager = new DataManager(clothesModel);

/**
 * make use of the Router lib 
 */
const router = express.Router();
/**
 * Calling our routes and their function
 */
router.get('/', getAllClothes);
router.get('/:id', getOneClothes);
router.post('/', addClothes);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);

/**
 * This function is used to get all clothes saved in the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} clothesObj
 */
async function getAllClothes (request, response, next){
  try{
    const clothesObj =  await dataManager.read();
    response.json(clothesObj);
    
  } catch (error){
    next(error);
  }
}
/**
 * This function is used to get one clothes element from the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} clothesObj
 */
async function getOneClothes (request, response, next){
  try {
    const clothesObj = await dataManager.read(request.params.id);
    response.json(clothesObj);
  } catch (error){
    next(error);
  }
}
/**
 * This function is used to add one clothes element to the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} clothesObj, status
 */
async function addClothes (request, response, next){
  try{
    const creatObj = request.body;
    // console.log(creatObj);
    const clothesObj = await dataManager.create(creatObj);
    response.status(201).json(clothesObj);
  } catch (error){
    next(error);
  }
}
/**
 * This function is used to update one clothes element to the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} clothesObj
 */
async function updateClothes (request, response, next){
  try {
    const clothesObj = request.body;
    const updatedClothes = await dataManager.update(request.params.id ,clothesObj);
    response.json(updatedClothes);
  } catch (error){
    next(error);
  }
}
/**
 * This function is used to delete one clothes element from the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} clothesObj
 */
async function deleteClothes (request, response, next){
  try{
    const clothesObj = await dataManager.delete(request.params.id);
    response.json(clothesObj);
  } catch (error){
    next(error);
  }
}  
/**
 * @typedef {exports(router)} 
 */
module.exports = router;