'use strict';

/**
 * adding dependencies
 */
const express= require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

/**
 * Requiring the error handlers and the middleware
 */
const logger = require('./middleware/logger');
const errorHandlers = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
/**
 * Requiring the food and clothes handlers
 */
const foodRoute = require('./routes/food');
const clothesRoute = require('./routes/clothes');
const toDoRoute = require('./routes/todo');
/**
 * Make use of the morgan cors logger dependencies 
 */
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(logger);
/**
 * Make use of the food and clothes handlers
 */ 
app.use('/api/v1/food', foodRoute);
app.use('/api/v1/clothes', clothesRoute);
app.use('/api/v1/todo', toDoRoute);


/**
 * This function is used to call the home Route
 * @param {request} send request
 * @param {response} send response
 * @returns {response} console massage 
 */
app.get('/', (request, response)=>{
  response.send('Welcome To The SERVER.JS');
});

/**
 * This function is used to call the home Route
 * @param {request} send request
 * @param {response} send response
 * @returns {response} error massage 
 */
app.get('/bad', (request, response)=>{
  throw new Error('SOMETHING WENT WRONG');
});
  
/**
   * Make use of the error handlers
   */
app.use(errorHandlers);
app.use('*', notFound);
/**
   * This function is used to start listening to app on PORT
   * @param {PORT} the port to listen with
   */
function start (PORT){
  app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
  });
}
  
/**
   * @typedef {exports(app, start} 
   */
module.exports= {
  app : app, 
  start : start,
};