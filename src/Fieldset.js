const path = require('path');
const { Registry, Helper } = require('geum');

const Exception = require('./Exception');
const formatters = require('./assets/formatters');
const validators = require('./assets/validators');

class Fieldset extends Registry {
  /**
   * @var {Array} detailable - gets all the fields with a detail format
   */
  get detailable() {
    const results = [];
    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;

      if(field.detail
        && field.detail.format
        && field.detail.format !== 'hide'
      ) {
        results.push(name);
      }
    });

    return results;
  }

  /**
   * @var {Array} fields
   */
  get fields() {
    return this.data.fields || [];
  }

  /**
   * @var {Array} files - gets all the file fields
   */
  get files() {
    const results = [];
    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;
      const types = ['file', 'image', 'filelist', 'imagelist'];

      if(types.indexOf(field.field.type) !== -1) {
        results.push(name);
      }
    });

    return results;
  }

  /**
   * @var {Array} json - gets all the JSON fields
   */
  get json() {
    const results = [];
    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;
      const types = [
        'filelist',
        'imagelist',
        'tag',
        'textlist',
        'textarealist',
        'wysiwyglist',
        'meta',
        'checkboxes',
        'multirange',
        'rawjson',
        'multiselect',
        'fieldset',
        'table',
        'latlng'
      ];

      if(types.indexOf(field.field.type) !== -1) {
        results.push(name);
      }
    });

    return results;
  }

  /**
   * @var {Array} listable - gets all the fields with a list format
   */
  get listable() {
    const results = [];
    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;

      if(field.list
        && field.list.format
        && field.list.format !== 'hide'
      ) {
        results.push(name);
      }
    });

    return results;
  }

  /**
   * @var {String} name
   */
  get name() {
    return this.data.name;
  }

  /**
   * @var {Array} required - gets all required fields
   */
  get required() {
    const results = [];
    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;

      if (!field.validation || !field.validation.length) {
        return;
      }

      field.validation.forEach(validation => {
        if(validation.method === 'required' && results.indexOf(name) === -1) {
          results.push(name);
        }
      });
    });

    return results;
  }

  /**
   * @var {Array} slugs - gets all slug fields
   */
  get slugs() {
    const results = [];
    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;

      if(field.field.type === 'slug') {
        results.push(name);
      }
    });

    return results;
  }

  /**
   * @var {Array} uniques - gets all unique fields
   */
  get uniques() {
    const results = [];
    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;

      if(field.field.type === 'uuid') {
        results.push(name);
        return;
      }

      if (!field.validation || !field.validation.length) {
        return;
      }

      field.validation.forEach(validation => {
        if(validation.method === 'unique' && results.indexOf(name) === -1) {
          results.push(name);
        }
      });
    });

    return results;
  }

  /**
   * @var {Array} uniques - gets all uuid fields
   */
  get uuids() {
    const results = [];
    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;

      if(field.field.type === 'uuid') {
        results.push(name);
        return;
      }
    });

    return results;
  }

  /**
   * Fieldset Loader
   *
   * @param {Object} data
   *
   * @return {Fieldset}
   */
  static load(data = {}) {
    return new Fieldset(data);
  }

  /**
   * Adds a field definition
   *
   * @param {String} name
   * @param {Object} config
   *
   * @return {Fieldset}
   */
  addField(name, config) {
    config = config || {};

    if (!config.type || typeof config.type !== 'string') {
      throw Exception.for('config.type is not valid')
    }

    config.value = config.value || '';
    config.validation = config.validation || [];

    config.list = config.list || [];
    config.detail = config.detail || [];

    return this.set('fields', '', config);
  }

  /**
   * Adds a format for a field
   *
   * @param {String} name
   * @param {String} type
   * @param {Object} config
   *
   * @return {Fieldset}
   */
  addFormat(name, type, format) {
    if (!this.fields.length) {
      throw Exception.for('Adding format for undefined field %s', name);
    }

    let found = false;
    this.fields.forEach(field, i) {
      if (field.name === name) {
        this.set('fields', i, 'format', type, format);
        found = true;
      }
    }

    if (!found) {
      throw Exception.for('Adding format for undefined field %s', name);
    }

    return this;
  }

  /**
   * Adds a custom validator against a field
   *
   * @param {String} name
   * @param {(Function|Object)} validation
   *
   * @return {Fieldset}
   */
  addValidation(name, validation) {
    if (!this.fields.length) {
      throw Exception.for('Adding validation for undefined field %s', name);
    }

    let found = false;
    this.fields.forEach(field, i) {
      if (field.name === name) {
        this.set('fields', i, 'validation', '', validation);
        found = true;
      }
    }

    if (!found) {
      throw Exception.for('Adding validation for undefined field %s', name);
    }

    return this;
  }

  /**
   * Removes keys from the data that is not defined in the fieldset
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  getFields(data) {
    let fields = {};

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
   * Returns format give type
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  async getFormat(type, data) {
    let errors = {};

    Object.keys(this.fields).forEach(name => {
      const formats = this.fields[name].format || {};

      if (!formats[type]) {
        return;
      }

      if (typeof formats[type] === 'function') {
        data[name] = await formats[type](data[name], data);
        return;
      }

      const formatter = formatters[formats[type].method];

      if (typeof formatter !== 'function') {
        return;
      }

      const parameters = formats[type].parameters || [];
      data[name] = await formatter(data[name], ...parameters);
    });

    return data;
  }

  /**
   * Returns errors based on validation
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  async getErrors(data) {
    let errors = {};

    Object.keys(this.fields).forEach(name => {
      const validation = this.fields[name].validation || [];
      Helper.aForEach(validation, async (validation) => {
        if (typeof validation === 'function') {
          await validation(data[name], errors);
          return;
        }

        const validator = validators[validation.method];

        if (typeof validator !== 'function') {
          return;
        }

        const parameters = validation.parameters || [];
        if (!validator(data[name], ...parameters)) {
          errors[name] = validation.message || 'invalid';
        }
      });

    });

    return errors;
  }
}

module.exports = Fieldset;
