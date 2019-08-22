const Text = require('./TextField');

class WysiwygField extends Text {

  get schema() {
    return { type: 'TEXT'};
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['data-do'] = 'wysiwyg';
    return React.createElement('textarea', this.props);
  }
}
