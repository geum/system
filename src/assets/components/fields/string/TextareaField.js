const Text = require('./TextField');

class TextareaField extends Text {

  get schema() {
    return { type: 'TEXT' };
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    return React.createElement('textarea', this.props);
  }
}
