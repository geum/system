const React = require('react');

class RadiosField extends React.Component {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
  get schema() {
    return { type: 'VARCHAR', length: 255 };
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
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */ //
  render() {
    return (
      React.createElement('div', this.props,
      React.createElement('label', {class: 'radio radio-2'},
      React.createElement('input', {class: 'system-form-control',
      name: this.state.key,
      type: 'radio',
      value: this.state.key}),
      React.createElement('span', this.state.value)))
    );
  }
}
