const React = require('react');

class TableFormat extends React.Component {
  /**
   * @var {Component} parameters - Getter only
   */
  get parameters() {
    return null;
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) { //value can be an array
    this.props.value = value;
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    if (!value){
      return(<div class="alert alert-info m-0">Empty</div>);
    }

    return(
      <table class="table table-striped table-bordered m-0">
      <thead><tr>
      //Need to differentiate between column and row
      //loop through every column and put its column value
      {this.props.value.column.map((val) => {
        return (<th>{val}</th>));
      })}

      </tr></thead>
      <tbody><tr>
      //loop through every row and put its row value
      {this.props.value.row.map((val) => {
        return (<th>{val}</th>));
      })}
      </tr></tbody>
    );

  }
}
