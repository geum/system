const Text = require('../string/TextField');

class PriceField extends Text {

  get schema() {
    return { type: 'FLOAT', length: '10,2' };
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['steps'] = '0.01';
    this.props.type = 'number';
  }
}
