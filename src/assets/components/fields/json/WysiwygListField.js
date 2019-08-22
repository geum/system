const Tag = require('./TagField');

class WysiwygListField extends Tag {

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['data-do']= 'wysiwyglist-field';
    this.props['class']= 'wysiwyglist-field';
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    const div = (
      <div class="field-row mb-3">
                <div class="btn-group mb-2">
                    <a
                        class="btn btn-danger remove"
                        href="javascript:void(0)"
                    >
                        <i class="fas fa-times"></i>
                    </a>
                    <a
                        class="btn btn-success move-up"
                        href="javascript:void(0)"
                    >
                        <i class="fas fa-arrow-up"></i>
                    </a>
                    <a
                        class="btn btn-orange move-down"
                        href="javascript:void(0)"
                    >
                        <i class="fas fa-arrow-down"></i>
                    </a>
                </div>
                <textarea
                    data-do="wysiwyg"
                    class="text-field form-control system-form-control"
                    name="{{../@key}}[]"
                >{{this}}</textarea>
            </div>);
    const btn = (<a class="field-add btn btn-success" href="javascript:void(0)">
              <i class="fas fa-plus"></i>
              <span>{{_ 'Add'}}</span>
          </a>);
    return React.createElement('div', this.props, div, btn);
  }
}
