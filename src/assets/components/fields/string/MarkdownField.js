const Textarea = require('./TextareaField');

class MarkdownField extends Textarea {

  constructor() {
    super();
    this.props['data-do'] = 'markdown-editor';
  }
}
