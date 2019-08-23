const Text = require('../string/TextField');

class NumberField extends Text {

  get schema() {
    return { type: 'INT' };
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props.type = 'number';
  }
}
