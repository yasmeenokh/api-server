'use strict'; 
/**
 * Requiring the express dependency and the clothes model class
 */
const express = require('express');
const foodModel = require('../models/food');
const DataManager = require('../models/data-collection-class');
const dataManager = new DataManager(foodModel);
/**
 * make use of the Router lib 
 */
const router = express.Router();
/**
 * Calling our routes and their function
 */
router.get('/', getAllFood);
router.get('/:id', getOneFood);
router.post('/', addFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

/**
 * This function is used to get all clothes saved in the db
 * @param {request} send request
 * @param {response} send response
 * @returns {response=json} foodObj
 */
async function getAllFood (request, response, next){
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
async function getOneFood (request, response, next){
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
async function addFood (request, response, next){
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
async function updateFood (request, response, next){
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
async function deleteFood (request, response, next){
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