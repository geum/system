const knex = require('knex');
const { Definition, Helper } = require('geum');

const StoreInterface = require('./contracts/StoreInterface');
const Fieldset = require('./Fieldset');
const Schema = require('./Schema');

class Store {
  /**
   * Store Loader
   *
   * @return {Store}
   */
  static load(config = {}) {
    return new Store(config);
  }

  /**
   * Setups the memory store
   */
  constructor(config = {}) {
    this.resource = knex(config);

    //allows interfaces to be manually changed
    this.SchemaInterface = Store.SchemaInterface;
  }

  /**
   * Returns the primary key
   *
   * @param {String} table
   *
   * @return {String}
   */
  primaryKey(table) {
    return table + '_id';
  }

  /**
   * Returns a schema attached to the store
   *
   * @param {(String|Object)} table
   *
   * @return {Schema}
   */
  schema(table) {
    if (typeof table === 'object') {
      return new this.SchemaInterface(this, table);
    }

    return new this.SchemaInterface(this, { name: table });
  }

  /**
   * Inserts data to the store
   *
   * @param {String} table
   * @param {Object} data
   *
   * @return {StoreInterface}
   */
  async insert(table, data) {
    return await this.resource(table).insert(data).returning('*');
  }

  /**
   * Retrieves data from the store
   *
   * @param {String} table
   * @param {String} key
   * @param {(String|Integer)} value
   *
   * @return {Object}
   */
  async detail(table, key, value) {
      return await this.resource(table).where(key, value).first() || null;
  }

  /**
   * Removes data from the store
   *
   * @param {String} table
   * @param {String} key
   * @param {(String|Integer)} value
   *
   * @return {Object}
   */
  async remove(table, key, value) {
    return await this.resource(table).where(key, value).del();
  }

  /**
   * Searches in the store
   *
   * @param {String} table
   * @param {*} [filters = []]
   *
   * @return {Array}
   */
  search(table, options = []) {
    //make a search
    const resource = this.resource(table);

    //clean the filters
    const { filters, sort, start, range } = parseSearchOptions(options);

    //make a search
    const resource = this.makeSearch(table);

    //parse filters
    addFilters(resource, filters);

    //sort
    if (sort.length)
    resource.orderBy(sort);

    //limit
    if (start) {
      resource.offset(start)
    }

    if (range) {
      resource.limit(range)
    }

    return resource;
  }

  /**
   * Updates data to the store
   *
   * @param {String} table
   * @param {String} key
   * @param {(String|Integer)} value
   * @param {Object} data
   *
   * @return {Object}
   */
  async update(table, key, value, data) {
    return await this.resource(table).where(key, value).update(data);
  }
}

/**
 * Adds filters based on specified data structure
 *
 * @param {Knex} resource
 * @param {Array} filters
 *
 * @return {Boolean}
 */
function addFilters(resource, filters) {
    // example filters
    // [
    //     ['eq', 'key', 'val'],
    //     ['lt', 'key', 'val'],
    //     ['null', 'key'],
    //     ['or', [
    //         ['eq', 'key', 'val'],
    //         ['lt', 'key', 'val']
    //     ]]
    // ]
  filters.forEach(filter => {
    //clone it
    filter = [].concat(filter);
    const action = filter.shift();

    //if no more filters
    if (filter.length === 0) {
      //make the action into a raw filter
      filter.push(action);
      filter.push([]);
      action = 'raw';
      return;
    }

    //switch abbrs to actual comparisons
    switch (action) {
      case 'eq': action = '='; break;
      case 'gt': action = '>'; break;
      case 'gte': action = '>='; break;
      case 'lt': action = '<'; break;
      case 'lte': action = '<='; break;
    }

    //if there are keys in this filter
    if (filter.length > 1) {
      //get the key
      const key = filter.shift();
      //get the value
      const value = filter.shift();

      //based on actions, perform the knex equivilent
      switch (action) {
        case 'bet':
        case 'between':
          //between, ie. [bet, column, 1, 2]
          if (filter.length) {
            const upper = filter.shift();
            resource.whereBetween(key, [value, upper]);
          }
          break;
        case 'raw':
        case 'custom':
          //raw, ie. [raw, bindings]
          resource.whereRaw(key, value);
          break;
        default:
          //shift the action back in
          //action [eq, val]
          filter.unshift(action);

          resource.where(key, action, value);
          break;
      }

      return;
    }

    //filter.length === 1 --> true

    //otherwise, filter count is zero
    //filter count is zero
    switch (action) {
      case 'and':
        resource.andWhere(() => {
          addFilters(resource, filter[0])
        });
        break;
      case 'or':
        resource.orWhere(() => {
          addFilters(resource, filter[0])
        });
        break;
      case 'ex':
      case 'exists':
        resource.whereExists(() => {
          addFilters(resource, filter[0])
        });
        break;
      case 'nex':
      case 'not_exists':
        resource.whereNotExists(() => {
          addFilters(resource, filter[0])
        });
        break;
      case 'nem':
      case 'not_empty':
        resource.whereNotNull(filter[0])
        break;
      case 'em':
      case 'empty':
      case 'null':
        resource.whereNull(filter[0])
        break;
    }
  });
}

/**
 * Normalizes the filter input
 *
 * @private
 *
 * @param {Array} filters
 *
 * @return {Array}
 */
function parseSearchOptions(options = []) {
  let sort = [],
    filters = [],
    offset = 0,
    limit = null;

  // example filters
  // [
  //   ['eq', 'key', 'val'],
  //   ['lt', 'key', 'val'],
  //   ['null', 'key'],
  //   ['or', [
  //     ['eq', 'key', 'val'],
  //     ['lt', 'key', 'val']
  //   ]]
  // ]
  options.forEach((filter, i) => {
    // 'key = value'
    if (typeof filter === 'string') {
      filters.push(filter);
      return;
    }

    if (!Array.isArray(filter) || !filter.length) {
      return;
    }

    //clone it
    filter = [].concat(filter);

    if (filter[0] === 'sort') {
      if (typeof filter[2] === 'undefined') {
        filter[2] = 'asc';
      }

      sort.push({
        column: filter[1],
        order: filter[2].toLowerCase()
      });

      return;
    }

    if (filter[0] === 'offset') {
      if (
        typeof filter[1] !== 'undefined'
        && !isNaN(parseInt(filter[1]))
      ) {
        offset = filter[1];
      }

      return;
    }

    if (filter[0] === 'limit') {
      if (
        typeof filter[1] !== 'undefined'
        && !isNaN(parseInt(filter[1]))
      ) {
        limit = filter[1];
      }

      return;
    }

    //default
    filters.push(filter);
  });

  //clean up
  filters = filters.filter(value => {
    return value;
  });

  return { filters, sort, offset, limit };
}

//definition check
Definition(Store).implements(StoreInterface);

//allows interfaces to be manually changed
Store.SchemaInterface = Schema;

//adapter
module.exports = Store;
