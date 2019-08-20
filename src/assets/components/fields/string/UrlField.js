const Text = require('./TextField');

class UrlField extends Text {

  constructor() {
    super();
    this.props['autocomplete'] = 'url';
    this.props['class'] = 'form-control system-form-control';
    this.props.type = 'url';
  }
}
