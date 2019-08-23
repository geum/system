const TextList = require('./TextListField');

class TextareaField extends TextList {

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['data-do']= 'textarealist-field';
    this.props['class']= 'textarealist-field';
  }
}
