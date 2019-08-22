const React = require('react');

class CheckboxField extends React.Component {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
  get schema() {
    return { type: 'INT', length: 1, attribute: 'unsigned' };
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
    this.props['class'] = 'system-form-control'
    this.props.type = 'hidden';
    this.props.value = '0';
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    const checkbox = (<label class="checkbox checkbox-2">
        <input
            class="system-form-control"
            name="{{@key}}"
            type="checkbox"
            value="1"
            {{#when this '==' 1}}checked{{/when}}
            {{#each config.attributes}}
                {{@key}}="{{this}}"
            {{/each}}
        />
        <span>{{config.attributes.placeholder}}</span>
    </label>);
    return React.createElement('input', this.props, checkbox);
  }
}
