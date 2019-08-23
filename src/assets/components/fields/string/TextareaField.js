const React = require('react');

class TextareaField extends React.Component {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
   get schema() {
     return { type: 'TEXT' };
   }

  get types(){
    return ['file', 'json'];
  }

  /**
   * @var {Object} attributes - Setter only
   */
  set attributes(attributes) {
    if (typeof attributes !== 'object') {
      //dont add
      return;
    }

    Object.assign(this.props, attributes);
  }

  /**
   * @var {Object} options - Setter only
   */
  set options(options) {
    if (typeof options !== 'object') {
      //dont add
      return;
    }

    this.options = options;
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    this.props.value = value;
  }

  static isJsonType(){
    return false;
  }

  static isFileType(){
    return false;
  }

  /**
   * Sets input type to text
   */
   constructor() {
     super();
     this.props['class'] = 'form-control system-form-control';
     this.props['name'] = this.state.key;
     this.state.key = this.state;
   }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return React.createElement('textarea', this.props);
  }

  /**
   * What happens before it is inserted/updated
   *
   * @param {String} value
   *
   * @return {String}
   */
  prepare(value) {
    return value;
  }
}