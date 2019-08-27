const { app, Registry } = require('geum');

const Store = require('./Store');
const Exception = require('./Exception');

const validators = require('./assets/validators');
const fields = require('./assets/components/fields');
const formats = require('./assets/components/formats');

class System {
  get store() {
    if (!this.cache.has('store')) {
      this.cache.set('store', Store.load(app.get('store')));
    }

    return this.cache.get('store');
  }

  /**
   * System loader
   *
   * @return {System}
   */
  static load() {
    return new System();
  }

  /**
   * Sets the cache
   *
   * @return {System}
   */
  constructor() {
    this.cache = Registry.load({ config: {} });

    this.registry = Registry.load({
      validator: validators,
      field: fields,
      format: formats
    });

    //allows interfaces to be manually changed
    this.FieldsetInterface = System.FieldsetInterface;
  }

  /**
   * Should either parse the configuration file
   * - or parse it and return the key give (null if it doesnt exist)
   * - or set the value (if it is not null)
   *
   * ex1. app.config('services') //--> { mysql: { host: '127.0.0.1', user: 'root', name: 'sample'}}
   * ex2. app.config('services', 'mysql') //--> { host: '127.0.0.1', user: 'root', name: 'sample'}
   *
   * ex3. app.config('services', 'mysql', { host: '127.0.0.1', user: 'root', name: 'sample'})
   * where `services` is found in `[PROJECT_PATH]/config/services.json`
   * You can determine project path using app.pwd OR process.env.PWD
   *
   * see: https://github.com/CradlePHP/Cradle/blob/master/bootstrap/paths.php#L55-L116
   *
   * @param {String} file - the name or path of the config file in the
   *                       `/config` directory
   * @param {String} [key = null] - the name of the key to return, if any
   * @param {*} - [value = null] - the arbitrary value, if any
   *
   * @return {Application}
   */
  config(file, key = null, value = null) {
    //we dont have it cache
    if (!this.cache.has('config', file)) {
      try {
        this.cache.set('config', file, require(path.join(this.path('config'), file)));
      } catch(e) {
        this.cache.set('config', file, {});
      }
    }

    if (typeof key === 'object') {
      value = key;
      key = null;
    }

    //read operations

    if (value === null) {
      if (key === null) {
        return this.cache.get('config', file);
      }

      if (!this.cache.has('config', file, key)) {
        return null;
      }

      return this.cache.get('config', file, key);
    }

    //write operations

    if (key !== null) {
      this.cache.set('config', file, key, value);
    } else if (typeof value !== 'object') {
      return this;
    } else {
      this.cache.set('config', file, value);
    }

    fs.writeFileSync(path.join(
      this.path('config'), file + '.json'),
      JSON.stringify(this.cache.get('config', file))
    );

    return this;
  }

  /**
   * Returns a fieldset
   *
   * @param {(String|Object)} name
   *
   * @return {Fieldset}
   */
  fieldset(name) {
    if (typeof name === 'object') {
      return new this.FieldsetInterface(name);
    }

    return new this.FieldsetInterface({ name });
  }

  /**
   * Sets or gets a path
   *
   * @param {String} key
   * @param {String} [destination = null]
   *
   * @return {Object}
   */
  path(key, destination = null) {
    if (destination === null) {
      return app.get('paths', key);
    }

    app.set('paths', key, destination);
    return this;
  }

  /**
   * Sets or gets a path
   *
   * @param {String} name
   *
   * @return {Schema}
   */
  schema(name) {
    //get the schema from the config
    const schema = this.config(path.join('schema', name));

    if (!schema) {
      throw Exception.for('Invalid schema %s', name);
    }

    //load the schema
    return this.store.schema(schema);
  }
}

//allows interfaces to be manually changed
System.FieldsetInterface = Fieldset;

module.exports = System;
