const Exception = require('../Exception');

/**
 * Store contract
 */
class StoreInterface {
  /**
   * Inserts data to the store
   *
   * @param {String} collectionName
   * @param {Object} data
   *
   * @return {StoreInterface}
   */
  async insert(collectionName, data) {
    throw Exception.forUndefinedAbstract('create');
  }

  /**
   * Retrieves data from the store
   *
   * @param {String} collectionName
   * @param {String} key
   * @param {(String|Integer)} value
   *
   * @return {Object}
   */
  async detail(collectionName, key, value) {
    throw Exception.forUndefinedAbstract('detail');
  }

  /**
   * Removes data from the store
   *
   * @param {String} collectionName
   * @param {String} key
   * @param {(String|Integer)} value
   *
   * @return {StoreInterface}
   */
  async remove(collectionName, key, value) {
    throw Exception.forUndefinedAbstract('remove');
  }

  /**
   * Searches in the store
   *
   * @param {String} collectionName
   * @param {*} [filters = []]
   *
   * @return [Array]
   */
  async search(collectionName, filters = []) {
    throw Exception.forUndefinedAbstract('search');
  }

  /**
   * Updates data to the store
   *
   * @param {String} collectionName
   * @param {String} key
   * @param {(String|Integer)} value
   * @param {Object} data
   *
   * @return {StoreInterface}
   */
  async update(collectionName, key, value, data) {
    throw Exception.forUndefinedAbstract('update');
  }
}

//adapter
module.exports = StoreInterface;
