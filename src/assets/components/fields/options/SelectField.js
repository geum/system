const React = require('react');

class SelectField extends React.Component {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
  get schema() {
    return { type: 'VARCHAR', length: 255 };
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
    return false;
  }

  static isFileType(){
    return false;
  }

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control'
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    const drop = ({{#each config.options}}
            <option
                value="{{./key}}"
                {{#when ../this '==' key}}selected{{/when}}
            >
                {{value}}
            </option>
        {{/each}});
    return React.createElement('select', this.props, drop);
  }
}
