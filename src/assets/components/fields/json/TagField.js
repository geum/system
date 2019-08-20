const React = require('react');

class TagField extends React.Component {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
  get schema() {
    return { type: 'JSON' };
  }

  /**
   * @var {Object} attributes - Setter only
   */
  set attributes(attributes) {
    if (typeof attributes !== 'object') {
      //dont add
      return;
    }

    Object.assign(this.props, attributes);
  }

  /**
   * @var {Object} options - Setter only
   */
  set options(options) {
    if (typeof options !== 'object') {
      //dont add
      return;
    }

    this.options = options;
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    this.props.value = value;
  }

  static isJsonType(){
    return true;
  }

  static isFileType(){
    return false;
  }

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['data-do']= 'tag-field';
    this.props['class']= 'tag-field';
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    const div = (<div class="tag">
                <input
                    class="tag-input text-field system-form-control"
                    type="text"
                    name="{{../@key}}[]"
                    value="{{this}}"
                />
                <a
                    class="remove"
                    href="javascript:void(0)"
                >
                    <i class="fa fa-times"></i>
                </a>
            </div>);
    return React.createElement('div', this.props, div);
  }
}
