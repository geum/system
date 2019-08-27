const React = require('react');

class EmailFormat extends React.Component {
  /**
   * @var {Component} parameters - Getter only
   */
  get parameters() {
    return (
      <textarea name="{this.props.name}[parameters][0]" placeholder="Label or {{value}}"></textarea>
    );
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    this.props.value = value;
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return (
      <a href="mailto:{this.props.value}">{this.props.parameters[0]}</a>
    );
  }
}
