const Text = require('../string/TextField');

class FloatField extends Text {

  get schema() {
    return { type: 'FLOAT'};
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props.type = 'number';
  }
}
