'use strict'; 
/**
 * @typedef {exports(request, response, next)} 
 */
module.exports = (request, response, next) => {
  console.log('REQUEST INFORMATION :', request.method, request.path);
  next();
};