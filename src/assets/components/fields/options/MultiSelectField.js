const Select = require('./SelectField');

class MultiSelectField extends Select {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
  get schema() {
    return { type: 'JSON' };
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
    this.props['class'] = 'form-control system-form-control'
    this.props['data-do'] = 'select-field';
    this.props['multiple'] = 'multiple';
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
