const React = require('react');

class TagField extends React.Component {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
  get schema() {
    return { type: 'JSON' };
  }

  get types(){
    return [ 'json' ];
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

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['data-do']= 'tag-field';
    this.props['class']= 'tag-field';
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
      React.createElement('div', {class: 'tag'},
      React.createElement('input', {class: 'tag-input text-field system-form-control',
      type: 'text',
      name: this.state.key[],
      value: this.state.value}),
      React.createElement('a', {class: 'remove',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fa fa-times'}))))
    );
  }
}
