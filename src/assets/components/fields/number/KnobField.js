const Text = require('../string/TextField');

class KnobField extends Text {

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['data-do'] = 'knob-field';
    this.props.type = 'text';
  }
}
