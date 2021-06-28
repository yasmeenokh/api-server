'use strict'; 
/**
 * Requiring the express dependency and the clothes model class
 */
const express = require('express');
const toDoModel = require('../models/to-do');
const DataManager = require('../models/data-collection-class');
const dataManager = new DataManager(toDoModel);
/**
 * make use of the Router lib 
 */
const router = express.Router();
/**
 * Calling our routes and their function
 */
router.get('/', getAllToDo);
router.get('/:id', getOneToDo);
router.post('/', addToDo);
router.put('/:id', updateToDo);
router.delete('/:id', deleteToDo);

/**
 * This function is used to get all clothes saved in the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} foodObj
 */
async function getAllToDo (request, response, next){
  try{
    const foodObj =  await dataManager.read();
    response.json(foodObj);
    
  } catch (error){
    next(error);
  }
}
/**
 * This function is used to get one clothes element from the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} foodObj
 */
async function getOneToDo (request, response, next){
  try {
    const foodObj = await dataManager.read(request.params.id);
    response.json(foodObj);
  } catch (error){
    next(error);
  }
}
/**
 * This function is used to add one clothes element to the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} foodObj, status
 */
async function addToDo (request, response, next){
  try{
    const creatObj = request.body;
    // console.log(creatObj);
    const foodObj = await dataManager.create(creatObj);
    response.status(201).json(foodObj);
  } catch (error){
    next(error);
  }
}
/**
 * This function is used to update one clothes element to the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} foodObj
 */
async function updateToDo (request, response, next){
  try {
    const foodObj = request.body;
    const updatedFood = await dataManager.update(request.params.id ,foodObj);
    response.json(updatedFood);
  } catch (error){
    next(error);
  }
}
/**
 * This function is used to delete one clothes element from the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} foodObj
 */
async function deleteToDo (request, response, next){
  try{
    const foodObj = await dataManager.delete(request.params.id);
    response.json(foodObj);
  } catch (error){
    next(error);
  }
}  
/**
 * @typedef {exports(router)} 
 */
module.exports = router;