const Model = require('./Model');
const Exception = require('./Exception');

class Collection {
  /**
   * @var {Model} model
   */
  get model() {
    return new this.ModelInterface(this);
  }

  /**
   * @var {String} primary
   */
  get primaryKey() {
    return this.store.primaryKey(this.schema.name);
  }

  /**
   * Collection Loader
   *
   * @param {SchemaInterface}
   * @param {StoreInterface}
   *
   * @return {Collection}
   */
  static load(schema, store) {
    return new Collection(schema, store);
  }

  /**
   * Sets the store name
   *
   * @param {SchemaInterface}
   * @param {StoreInterface}
   *
   */
  constructor(schema, store) {
    this.schema = schema;
    this.store = store;

    //allows interfaces to be manually changed
    this.ModelInterface = Collection.ModelInterface;
  }

  /**
   * Inserts data to an external store or via API
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  async insert(data) {
    const errors = this.schema.getErrors(data);

    if (Object.keys(errors).length) {
      throw Exception.forErrorsFound(errors)
    }

    const fields = this.schema.getFields(data);

    let results = await this.store.insert(this.schema.name, fields);

    return results;
  }

  /**
   * Retrieves data from an external store or via API
   *
   * @param {String|Integer} id
   *
   * @return {Object}
   */
  async detail(id) {
    const key = this.getPrimaryKey();
    return await this.store.detail(this.schema.name, key, id);
  }

  /**
   * Removes data from an external store or via API
   *
   * @param {String|Integer}
   *
   * @return {Object}
   */
  async remove(id) {
    const key = this.getPrimaryKey();
    return await this.store.remove(this.schema.name, key, id);
  }

  /**
   * Searches in an external store or via API
   *
   * @param {*} filters
   *
   * @return {Array}
   */
  async search(filters) {
    return await this.store.search(this.schema.name, filters);
  }

  /**
   * Updates data to an external store or via API
   *
   * @param {String|Integer} id
   * @param {Object} data
   *
   * @return {Object}
   */
  async update(id, data) {
    const key = this.getPrimaryKey();

    if (typeof data[key] === 'undefined') {
      throw Exception.for('Missing primary key %s', key);
    }

    const errors = this.schema.getErrors(data);

    if (Object.keys(errors).length) {
      throw Exception.forErrorsFound(errors);
    }

    const fields = this.schema.getFields(data);
    return await this.store.update(this.schema.name, key, id, fields);
  }
}

//allows interfaces to be manually changed
Collection.ModelInterface = Model;

//adapter
module.exports = Collection;
