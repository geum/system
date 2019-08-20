const Tag = require('./TagField');

class TableField extends Tag {

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['data-do']= 'table-field';
    this.props['class']= 'table-field';
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    const head = (<thead><tr><th>Header</th></tr></thead>);
    const body = (<tbody><tr><td>Body</td></tr></tbody>);
    return React.createElement('table', this.props, head, body);
  }
}
