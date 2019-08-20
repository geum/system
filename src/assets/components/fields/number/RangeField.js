const Text = require('../string/TextField');

class RangeField extends Text {

  get schema() {
    return { type: 'INT'};
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['data-do'] = 'multirange-field';
    //Max, min, steps | 10, 0, 0.5 respectively
    this.props['tabindex'] = '-1';
    // this.props['max'] = '10';
    // this.props['min'] = '0';
    // this.props['steps'] = '0.5';
    // this.props['data-max'] = '10';
    // this.props['data-step'] = '0.5';
    // this.props['data-min'] = '0';
    this.props.type = 'number';
  }
}
