'use strict';

const logger = require('../src/middleware/logger.js');


describe ('logger middleware', ()=>{
  let consoleSpy;
  const request = {method : 'get', path : 'test' };
  const response = {};
  const next = jest.fn();

  beforeEach(()=>{
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(()=>{
    consoleSpy.mockRestore();
  });
  it('should log all get requests', ()=>{
    logger(request, response, next); 
    expect(consoleSpy).toHaveBeenCalledWith('REQUEST INFORMATION :', 'get', 'test');
    expect(next).toHaveBeenCalledWith();
  });      
});