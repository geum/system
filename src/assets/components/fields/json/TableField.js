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
    const table = (<table class ="table table-striped"><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Body</td></tr></tbody></table>);
    const btn = (<a
            class="row-add btn btn-success"
            href="javascript:void(0)"
        >
            <i class="fas fa-plus"></i>
            <span>{{_ 'Add Row'}}</span>
        </a>);
    return React.createElement('div', this.props, table, btn);
  }
}
