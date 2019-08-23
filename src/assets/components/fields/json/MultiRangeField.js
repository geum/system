const Text = require('../string/TextField');

class MultiRangeField extends Text {

  constructor() {
    super();
    this.props['autocomplete'] = 'off';
    this.props['class'] = 'irs-hidden-input system-form-control';
    this.props['data-do'] = 'multirange-field';
    this.props['data-type'] = 'double';
    this.props['tabindex'] = '-1';
    this.props.type = 'hidden';
  }
}
