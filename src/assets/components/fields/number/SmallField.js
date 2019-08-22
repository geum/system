const Text = require('../string/TextField');

class SmallField extends Text {

  get schema() {
    return { type: 'INT', length: 1, attribute: 'unsigned' };
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['max'] = '9';
    this.props['min'] = '0';
    this.props['steps'] = '1';
    this.props.type = 'number';
  }
}
