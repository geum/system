const path = require('path');
const { app, Registry, Helper } = require('geum');

const Exception = require('./Exception');

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
    const types = [];

    app.system.registry.each('field', (name) => {
      const Field = app.system.registry.get('field', name);

      if (Field.types.indexOf('file') !== -1) {
        types.push(name);
      }
    });

    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;

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
    const types = [];

    app.system.registry.each('field', (name) => {
      const Field = app.system.registry.get('field', name);

      if (Field.types.indexOf('json') !== -1) {
        types.push(name);
      }
    });

    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;

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
   * @var {Array} uniques - gets all unique fields
   */
  get uniques() {
    const results = [];
    const types = [];

    app.system.registry.each('field', (name) => {
      const Field = app.system.registry.get('field', name);

      if (Field.types.indexOf('unique') !== -1) {
        types.push(name);
      }
    });

    this.fields.forEach(field => {
      const name = this.name + '_' + field.name;

      if(types.indexOf(field.field.type) !== -1) {
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
  addField(name, field) {
    field = Object.assign({
      value: '',
      validation: [],
      format: { list: {}, detail: {} }
    }, field || {});

    if (!field.type || typeof field.type !== 'string') {
      throw Exception.for('field.type is required');
    }

    if (!app.system.registry.has('field', field.type)) {
      throw Exception.for('field.type %s is not registered', field.type);
    }

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
    if (!format.type || typeof format.type !== 'string') {
      throw Exception.for('format.type is required');
    }

    if (!app.system.registry.has('format', format.type)) {
      throw Exception.for('format.type %s is not registered', format.type);
    }

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
    if (!validation.type || typeof validation.type !== 'string') {
      throw Exception.for('validation.type is required');
    }

    if (!app.system.registry.has('validator', validation.type)) {
      throw Exception.for('validation.type %s is not registered', format.type);
    }

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
   * Returns field information given name
   *
   * @param {String} name
   *
   * @return {Object}
   */
  getField(name) {
    let field = null;
    for (let index in this.fields) {
      if (this.fields[index].name === name) {
        //clone
        field = Object.assign({}, this.fields[index]);
        break;
      }
    }

    if (!field) {
      return null;
    }

    field.component = app.system.registry('field', field.type);
    //clone
    field.format = Object.assign({}, field.format);
    //loop through the formats
    Object.keys(field.format).forEach(name => {
      //clone
      const format = field.format[name] = Object.assign({}, field.format[name]);
      format.component = app.system.registry('format', format.type);
    });

    return field;
  }

  /**
   * Removes keys from the data that is not defined in the fieldset
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  getValues(data) {
    let fields = {};

    //add the other fields
    this.fields.forEach(field => {
      if (typeof data[field.name] !== 'undefined') {
        fields[field.name] = app.system
          .registry('field', field.type)
          .prepare(data[field.name]);

        return;
      }

      fields[field.name] = app.system
        .registry('field', field.type)
        .prepare(field.value);
    });

    return fields;
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
