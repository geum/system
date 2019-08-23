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
    return (
      React.createElement('div', this.props,
      React.createElement('table',{class: 'table table-striped'}, head, body),
      React.createElement('a',{class: 'row-add btn btn-success',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-plus'},
      React.createElement('span', 'Add Row'))))
    );
  }
}
