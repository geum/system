const Text = require('./TextField');

class MarkdownField extends Text {

  get schema() {
    return { type: 'TEXT'};
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['data-do'] = 'markdown-editor';
    return React.createElement('textarea', this.props);
  }
}
