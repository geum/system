const Text = require('./TextField');

class EmailField extends Text {

  constructor() {
    super();
    this.props['autocomplete'] = 'email';
    this.props['class'] = 'form-control system-form-control';
    this.props.type = 'email';
  }
}
