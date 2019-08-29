const React = require('react');

class CapitalizeFormat extends React.Component {
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
    this.props.value = value.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
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
