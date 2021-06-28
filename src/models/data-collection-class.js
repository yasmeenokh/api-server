
'use strict';
/**
 * DataManager is an example class for my DataManager constructor.
 * @class
 * @constructor
 * @public
 */

class DataManager {
  constructor (model){
    this.model = model;
  }
  /**
       * create is an example property that sets the obj
       * @type {number}
       * @type {obj}
       * @returns {obj}
       */
  create (obj) {
    const dataElement = new this.model(obj);
    return dataElement.save();
  }
  /**
       * create is an example property that sets the obj from db
       * @type {number}
       * @returns {Array}
       */
  read(id){
    if (id){
      return this.model.find({_id: id});
    } else {return this.model.find({});}

  }
  /**
       * create is an example property that updates obj in the db
       * @type {number}
       * @returns {obj}
       */
  update(id, obj){
    return this.model.findByIdAndUpdate(id, obj, {new: true});
  }
  /**
       * create is an example property that deletes obj in from db
       * @type {number}
       * @returns {Array}
       */
  delete(id){
    return this.model.findByIdAndDelete(id);
  }
}
/**
 * @typedef {exports(Food)} 
 */
module.exports = DataManager;