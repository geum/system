const React = require('react');

class TextListField extends React.Component {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
  get schema() {
    return { type: 'JSON' };
  }

  get types(){
    return ['file'];
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
    return true;
  }

  static isFileType(){
    return false;
  }

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['data-do'] = 'textlist-field';
    this.props['class'] = 'textlist-field';
    this.props['data-name'] = this.state.key;
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return (
      React.createElement('div', this.props,
      React.createElement('div', {class: 'field-row input-group mb-3'},
      React.createElement('div', {class: 'input-group-prepend'},
      React.createElement('a', {class: 'input-group-text text-success move-up',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-arrow-up'}))),


      React.createElement('div', {class: 'input-group-prepend'},
      React.createElement('a', {class: 'input-group-text text-orange move-down',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-arrow-down'}))),

      React.createElement('input', {class: 'text-field form-control system-form-control',
      name: this.state.key[],
      type: 'text',
      value: this.props.value}),

      React.createElement('div', {class: 'input-group-prepend'},
      React.createElement('a', {class: 'input-group-text text-danger remove',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-times'})))),

      React.createElement('a', {class: 'field-add btn btn-success',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-plus'},
      React.createElement('span', 'Add'))))
    );
  }
}
