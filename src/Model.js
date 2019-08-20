const { Registry } = require('geum');
const Exception = require('./Exception');

/**
 * Model abstract used as a starting point
 * to implement ModelInterface
 */
class Model extends Registry {
  /**
   * Model Loader
   *
   * @param {Object} [data = {}]
   * @param {CollectionInterface} collection
   *
   * @return {Model}
   */
  static load(collection, data = {}) {
    return new Model(collection, data);
  }

  /**
   * Adds the initial data
   *
   * @param {CollectionInterface} collection
   * @param {Object} [data = {}]
   */
  constructor(collection, data = {}) {
    super(data);

    //then set the collection
    this.collection = collection;
  }

  /**
   * Clones the data and returns a new Model class
   *
   * @return {Model}
   */
  clone() {
    return new this.constructor(
      Object.assign({}, this.data),
      this.collection
    );
  }

  /**
   * Copies data from one key to the other
   *
   * @param {(String|Integer)} from
   * @param {(String|Integer)} to
   *
   * @return {Model}
   */
  copy(from, to) {
    this.data[to] = this.data[from];
    return this;
  }

  /**
   * Inserts data to an external store or via API
   *
   * @return {Model}
   */
  async insert() {
    this.data = await this.collection.insert(this.data);
    return this;
  }

  /**
   * Removes data from an external store or via API
   *
   * @return {Model}
   */
  async remove() {
    const primaryKey = this.collection.getPrimaryKey();

    if (typeof this.data[primaryKey] === 'undefined') {
      throw Exception.for('Missing %s', primaryKey);
    }

    return this.collection.remove(this.data[primaryKey]);
  }

  /**
   * Inserts or updates data to an external store or via API
   *
   * @return {Model}
   */
  async save() {
    const primaryKey = this.collection.primaryKey;

    if (typeof this.data[primaryKey] === 'undefined') {
      return this.insert();
    }

    return this.update();
  }

  /**
   * Updates data to an external store or via API
   *
   * @return {Model}
   */
  async update() {
    const primaryKey = this.collection.getPrimaryKey();

    if (typeof this.data[primaryKey] === 'undefined') {
      throw Exception.for('Missing %s', primaryKey);
    }

    this.data = await this.collection.update(this.data[primaryKey], this.data);

    return this;
  }
}

//adapter
module.exports = Model;
