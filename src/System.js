const { app } = require('geum');

const Store = require('./Store');
const Exception = require('./Exception');

class System {
  get store() {
    if (!this.cache.store) {
      this.cache.store = Store.load(app.get('store'));
    }

    return this.cache.store;
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
    this.cache = { config: {} };
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
    if (typeof this.cache.config[file] === 'undefined') {
      try {
        this.cache.config[file] = require(path.join(this.path('config'), file));
      } catch(e) {
        this.cache.config[file] = {};
      }
    }

    if (typeof key === 'object') {
      value = key;
      key = null;
    }

    //read operations

    if (value === null) {
      if (key === null) {
        return this.cache.config[file];
      }

      if (typeof this.cache.config[file][key] === 'undefined') {
        return null;
      }

      return this.cache.config[file][key];
    }

    //write operations

    if (key !== null) {
      this.cache.config[file][key] = value;
    } else if (typeof value !== 'object') {
      return this;
    } else {
      this.cache.config[file] = value;
    }

    fs.writeFileSync(path.join(
      this.path('config'), file + '.json'),
      JSON.stringify(this.cache.config[file])
    );

    return this;
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

module.exports = System;
