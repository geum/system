const Text = require('./TextField');

class ColorField extends Text {

  get schema() {
    return { type: 'VARCHAR', length: 7 };
  }

  constructor() {
    super();
    this.props['autocomplete'] = 'color';
    this.props['class'] = 'form-control system-form-control';
    this.props.type = 'color';
  }
}
