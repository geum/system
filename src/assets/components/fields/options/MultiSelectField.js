const Select = require('./SelectField');

class MultiSelectField extends Select {
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
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control'
    this.props['data-do'] = 'select-field';
    this.props['multiple'] = 'multiple';
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return (
      React.createElement('select', this.props,
      React.createElement('option',{value: this.state.key})
    );
  }
}
