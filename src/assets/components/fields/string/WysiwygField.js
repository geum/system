const Textarea = require('./TextareaField');

class WysiwygField extends Textarea {

  constructor() {
    super();
    this.props['data-do'] = 'wysiwyg';
  }
}
