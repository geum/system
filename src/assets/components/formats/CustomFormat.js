const React = require('react');

class CustomFormat extends React.Component {
  /**
   * @var {Component} parameters - Getter only
   */
  get parameters() {
    return (
      <textarea name="{this.props.name}[parameters][0]" placeholder="{{user_first}} {{user_last}}"></textarea>
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
    return this.props.parameters[0];
  }
}
