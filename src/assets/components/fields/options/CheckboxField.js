const React = require('react');

class CheckboxField extends React.Component {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
  get schema() {
    return { type: 'INT', length: 1, attribute: 'unsigned' };
  }

  get types(){
    return [];
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
    this.props['class'] = 'system-form-control'
    this.props.type = 'hidden';
    this.props.value = '0';
    this.props.name = this.state.key;
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return (
      React.createElement('input', this.props,
      React.createElement('label', {class: 'checkbox checkbox-2'},
      React.createElement('input', {class: 'system-form-control',
      name: 'this.state.key',
      type: 'checkbox',
      value: '1'})))
    );
  }
}
