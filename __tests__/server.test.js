'use strict'; 

const server = require('../src/server');
const superTest = require('supertest');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.app);
const mangoose = require('mongoose');
require('dotenv').config();

// mangoose.connect(process.env.MONGOOSE_TEST_URI, 
//   { useNewUrlParser : true , useUnifiedTopology : true}, async ()=>{
//     await mangoose.connection.db.dropDatabase();
//   });

describe('api server', ()=>{
  it('should give 404 status', async ()=>{
    const response = await request.get('/foo');
    expect(response.status).toBe(404);
  });
  it('should give 404 status', async ()=>{
    const response = await request.post('/');
    expect(response.status).toBe(404);
  });
  it ('should give 500 error', async ()=>{
    const response = await request.get('/bad');
    expect (response.status).toBe(500);
  });
  
});

describe('Api Food', ()=>{
  // afterAll(()=>{
  //   mangoose.connection.close();
  // });
  let id;
  let food;
  it('should create a new object using post', async()=>{
    food = {
      name : 'apple',
      type : 'fruits',
    };
    const response = await request.post('/api/v1/food').send(food);

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('apple');
    expect(response.body.type).toEqual('fruits');
    expect(response.body._id.length).toBeGreaterThan(0);
    id = response.body._id;
  });
  it('get a food using Get /food/:id', async () => {
    food = {
      name : 'apple',
      type : 'fruits',
    };
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('apple');
  });
  it('should update an object using put', async()=>{
    let editedFood = {
      name : 'apple',
      type : 'vegetable',
    };
    const response = await request.put(`/api/v1/food/${id}`).send(editedFood);
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('vegetable');
  });

  it('should retrieve all data from the DB', async()=>{
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should be able to delete data from the DB', async()=>{
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    // expect(response.body).toEqual([]);
  });
});

describe('Api clothes', ()=>{
  // afterAll(()=>{
  //   mangoose.connection.close();
  // });
  let id;
  let clothes;
  it('should create a new object using post', async()=>{
    clothes = {
      name : 'T-shirt',
      type : 'men',
    };
    const response = await request.post('/api/v1/clothes').send(clothes);

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('T-shirt');
    expect(response.body.type).toEqual('men');
    expect(response.body._id.length).toBeGreaterThan(0);
    id = response.body._id;
  });
  it('get a clothes using Get /clothes/:id', async () => {
    const response = await request.get(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('T-shirt');
  });
  it('should update an object using put', async()=>{
    clothes = {
      name : 'T-shirt',
      type : 'women',
    };
    const response = await request.put(`/api/v1/clothes/${id}`).send(clothes);
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('women');
  });
  
  it('should retrieve all data from the DB', async()=>{
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  }); 

  it('should be able to delete data from the DB', async()=>{
    const response = await request.delete(`/api/v1/clothes/${id}`);
    expect(response.status).toBe(200);
    // expect(response.body).toEqual([]);

  });


});