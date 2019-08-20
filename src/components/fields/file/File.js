const React = require('react');

class File extends React.Component {
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

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props.type = 'file';
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    const head = (<thead><tr><th>Column 1</th></tr></thead>);
    const body = (<tbody><tr><td>Some Value</td></tr></tbody>);
    return React.createElement('table', this.props, head, body);
  }

  /**
   * What happens before it is inserted/updated
   *
   * @param {String} value
   *
   * @return {String}
   */
  prepare(value) {
    //should upload base64 value it to upload location and pass the file path
    return value;
  }
}
