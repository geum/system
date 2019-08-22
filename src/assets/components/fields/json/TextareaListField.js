const Tag = require('./TagField');

class TextareaField extends Tag {

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['data-do']= 'textarealist-field';
    this.props['class']= 'textarealist-field';
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    const div = (
      <div class="field-row input-group mb-3">
          <div class="input-group-prepend">
              <a
                  class="input-group-text text-success move-up"
                  href="javascript:void(0)"
              >
                  <i class="fas fa-arrow-up"></i>
              </a>
          </div>
          <div class="input-group-prepend">
              <a
                  class="input-group-text text-orange move-down"
                  href="javascript:void(0)"
              >
                  <i class="fas fa-arrow-down"></i>
              </a>
          </div>
          <textarea
              class="text-field form-control system-form-control"
              name="{{../@key}}[]"
          >{{this}}</textarea>
          <div class="input-group-append">
              <a
                  class="input-group-text text-danger remove"
                  href="javascript:void(0)"
              >
                  <i class="fas fa-times"></i>
              </a>
          </div>
      </div>);
    const btn = (<a class="field-add btn btn-success" href="javascript:void(0)">
          <i class="fas fa-plus"></i>
          <span>{{_ 'Add'}}</span>
      </a>);
    return React.createElement('div', this.props, div, btn);
  }
}
