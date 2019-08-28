const React = require('react');

class TagListFormat extends React.Component {
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
    return (<div class="badge badge-orange">
      {this.props.value.map((val) => {
        return val;
      })}
      </div>
    );
  }
}
