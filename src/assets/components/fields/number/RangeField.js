const Text = require('../string/TextField');

class RangeField extends Text {

  get schema() {
    return { type: 'INT'};
  }

  constructor() {
    super();
    this.props['class'] = 'irs-hidden-input system-form-control';
    this.props['data-do'] = 'multirange-field';
    this.props['tabindex'] = '-1';
    this.props.type = 'hidden';
  }
}
