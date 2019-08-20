const Exception = require('../Exception');

/**
 * Schema used for stores and form validation
 */
class SchemaInterface {
  /**
   * Returns errors based on validation
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  getErrors(data) {
    throw Exception.forUndefinedAbstract('getErrors');
  }

  /**
   * Removes keys from the data that is not defined in the schema
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  getFields(data) {
    throw Exception.forUndefinedAbstract('getFields');
  }
}

//adapter
module.exports = SchemaInterface;
