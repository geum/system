const Textarea = require('./TextareaField');

class CodeField extends Textarea {

  constructor() {
    super();
    this.props['class'] = 'form-control hidden system-form-control';
    this.props['data-do'] = 'code-editor';
  }
}
