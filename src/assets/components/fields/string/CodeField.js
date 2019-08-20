const Text = require('./TextField');

class CodeField extends Text {

  get schema() {
    return { type: 'TEXT'};
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['data-do'] = 'code-editor';
  }
}
