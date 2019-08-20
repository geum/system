const Text = require('./TextField');

class MaskField extends Text {

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['data-do'] = 'mask-field';
  }
}
