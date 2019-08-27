const React = require('react');

class UpperCaseFormat extends React.Component {
  /**
   * @var {Component} parameters - Getter only
   */
  get parameters() {
    return null;
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    this.props.value = value.toUpperCase();
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return (<span>{this.props.value}</span>);
  }
}
