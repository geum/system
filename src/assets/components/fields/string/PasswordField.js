const Text = require('./TextField');

class PasswordField extends Text {

  constructor() {
    super();
    this.props['autocomplete'] = 'password';
    this.props['class'] = 'form-control system-form-control';
    this.props.type = 'password';
  }
}
