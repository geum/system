const knex = require('knex');

class Store {
  /**
   * Store Loader
   *
   * @param {Object} config
   *
   * @return {Store}
   */
  static load(config) {
    return new Store(config);
  }

  /**
   * Sets the Resource
   *
   * @param {Object} config
   */
  constructor(config) {
    this.resource = knex(config);
  }

  /**
   * Inserts row
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  create(data) {}

  /**
   * Inserts row
   *
   * @param {String} key
   * @param {String} value
   *
   * @return {Object}
   */
  get(key, value) {}

  /**
   * Searches through table and returns the results
   *
   * @param {Object} filters
   *
   * @return {Object}
   */
  search(filters) {}

  /**
   * Removes a row given a key value
   *
   * @param {String} key
   * @param {String} value
   *
   * @return {Object}
   */
  remove(key, value) {}

  /**
   * Updates a row given a key value
   *
   * @param {String} key
   * @param {String} value
   * @param {Object} data
   *
   * @return {Object}
   */
  update(key, value, data) {}
}


var database = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});

database('table').insert({a: 'b'}).returning('*').toString();
