'use strict';
const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
  task: {type: String, required: true },
  assignee: { type: String},
  difficulty: { type: String},
  date : {type: Date},
    
});

const toDoModel = mongoose.model('ToDo', toDoSchema);

module.exports = toDoModel; 