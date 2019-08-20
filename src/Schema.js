const path = require('path');
const knex = require('knex');
const { app } = require('geum');

const Exception = require('./Exception');
const Fieldset = require('./Fieldset');
const Collection = require('./Collection');

class Schema extends Fieldset {
  /**
   * @var {String} active - gets the active field name or false otherwise
   */
  get active() {
    return getSpecialField(this, 'active');
  }

  /**
   * @var [Collection] collection
   */
  get collection() {
    //no need for multiple collections
    if (!this._collection) {
      this._collection = new this.CollectionInterface(this, this.store);
    }

    return this._collection;
  }

  /**
   * @var {String} created - gets the created field name or false otherwise
   */
  get created() {
    return getSpecialField(this, 'created');
  }

  /**
   * @var {Array} filterable - gets all the fields that are filterable
   */
  get filterable() {
    return getIndexFields(this, 'filterable');
  }

  /**
   * @var {Object} inverseRelations - gets all schemas that are related to this one
   */
  get inverseRelations() {
    return getInverseRelations(this);
  }

  /**
   * @var {Object} inverseRelations10 - gets all schemas that are related to this one by 1:0
   */
  get inverseRelations10() {
    return getInverseRelations('10');
  }

  /**
   * @var {Object} inverseRelations11 - gets all schemas that are related to this one by 1:1
   */
  get inverseRelations11() {
    return getInverseRelations('11');
  }

  /**
   * @var {Object} inverseRelations1N - gets all schemas that are related to this one by 1:N
   */
  get inverseRelations1N() {
    return getInverseRelations('1N');
  }

  /**
   * @var {Object} inverseRelationsNN - gets all schemas that are related to this one by N:N
   */
  get inverseRelationsNN() {
    return getInverseRelations('NN');
  }

  /**
   * @var {String} primary
   */
  get primary() {
    return this.name + '_id';
  }

  /**
   * @var {Object} relations - gets all the related schemas
   */
  get relations() {
    return getRelations(this);
  }

  /**
   * @var {Object} relations10 - gets all the 1:0 related schemas
   */
  get relations10() {
    return getRelations('10');
  }

  /**
   * @var {Object} relations11 - gets all the 1:1 related schemas
   */
  get relations11() {
    return getRelations('11');
  }

  /**
   * @var {Object} relations1N - gets all the 1:N related schemas
   */
  get relations1N() {
    return getRelations('1N');
  }

  /**
   * @var {Object} relationsNN - gets all the N:N related schemas
   */
  get relationsNN() {
    return getRelations('NN');
  }

  /**
   * @var {Array} searchable - gets all the fields that are searchable
   */
  get searchable() {
    return getIndexFields(this, 'searchable');
  }

  /**
   * @var {Array} sortable - gets all the fields that are sortable
   */
  get sortable() {
    return getIndexFields(this, 'sortable');
  }

  /**
   * @var {String} updated - gets the updated field name or false otherwise
   */
  get updated() {
    return getSpecialField(this, 'updated');
  }

  /**
   * Schema Loader
   *
   * @param {Object} data
   *
   * @return {Schema}
   */
  static load(store, data = {}) {
    return new Schema(store, data);
  }

  /**
   * Sets the initial data
   *
   * @param {Object} data
   */
  constructor(store, data = {}) {
    super(data);
    this.store = store;
    this.CollectionInterface = Schema.CollectionInterface
  }

  /**
   * Removes keys from the data that is not defined in the schema
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  getFields(data) {
    let fields = {};
    //add the primary
    if (typeof data[this.primary] !== 'undefined') {
      fields[primary] = data[primary];
    }

    //add the other fields
    this.fields.forEach(field => {
      if (typeof data[field.name] !== 'undefined') {
        fields[field.name] = data[field.name];
      } else if (typeof field.value !== 'undefined') {
        fields[field.name] = field.value;
      }
    });

    return fields;
  }

  /**
   * Makes a suggestion to label the given data
   *
   * @param {Object} data
   *
   * @return {String}
   */
  getSuggestion(data) {
    //if no suggestion format
    if (!this.data.suggestion) {
      return '';
    }

    const suggestion = this.get('suggestion') || '';
    const matches = suggestion.match(/(\$\{[^\}]+\})/g);

    if (!matches || !matches.length) {
      return suggestion;
    }

    matches.forEach((match) => {
      const key = match.substr(2, -1)
      const value = data[key] || '';
      const pattern = '/\\$\\{' + key + '\\}/g';
      suggestion = suggestion.replace(new RegExp(pattern), value);
    });

    return suggestion;
  }

  toSql() {}
}

/**
 * Returns all the fields with the given type
 *
 * @param {Object} schema
 * @param {String} type
 *
 * @return {Array}
 */
function getIndexFields(schema, type) {
  const fields = [];

  schema.fields.forEach(field => {
    if (field[type]) {
      fields.push(schema.name + '_' + field.name);
    }
  });

  return fields;
}

/**
 * Returns all the relations with the given type
 *
 * @param {Object} schema
 * @param {String} [type = null]
 *
 * @return {Array}
 */
function getRelations(schema, type = null) {
  if (!this.data.relations || !this.data.relations.length) {
    return {};
  }

  const results = {};
  this.data.relations.forEach(relation => {
    if (type !== null && relation.type != type) {
      return;
    }

    const name = this.name + '_' + relation.name;

    try {
      results[name] = Schema.load(relation.name);
    } catch (e) {
      //this is not a registered schema, lets make a best guess
      results[name] = {
        name: relation.name,
        singular: relation.name[0].toUpperCase() + relation.name.substr(1),
        plural: relation.name[0].toUpperCase() + relation.name.substr(1) + 's',
        primary: relation.name + '_id'
      }
    }

    results[name].table = name;
    results[name].primary1 = this.primary;
    results[name].primary2 = relation.primary;
    results[name].type = type;

    //case for relating to itself ie. post_post
    if (this.name === relation.name) {
      results[name].primary1 += '_1';
      results[name].primary2 += '_2';
    }
  })

  return results;
}

/**
 * Returns all the inverse relations with the given type
 *
 * @param {Object} schema
 * @param {String} [type = null]
 *
 * @return {Array}
 */
function getInverseRelations(schema, type = null) {
  //any other way to do this?
  const schemas = app.server.request('system-schema-search').rows;

  if (!schemas || !schemas.length) {
    return {};
  }

  const results = {};
  schemas.forEach(relation => {
    relation = Schema.load(relation);

    const name = relation.name + '_' + this.name;
    const method = 'relations' + (type || '');
    const schema = relation[method][name];

    if (!schema) {
      return;
    }

    results[name] = schema;
  })

  return results;
}

/**
 * Returns the name of the special field given the suffix
 *
 * @param {Object} schema
 * @param {String} name
 *
 * @return {String}
 */
function getSpecialField(schema, name) {
  for (let field in schema.fields) {
    if (field.name === name) {
      return schema.data.name + '_' + field.name;
    }
  }

  return false;
}

//allows interfaces to be manually changed
Schema.CollectionInterface = Collection;

//adapter
module.exports = Schema;
