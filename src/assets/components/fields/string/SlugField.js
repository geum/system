const Text = require('./TextField');

class SlugField extends Text {

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['data-do'] = 'slugger';
  }
}
