const React = require('react');

class YesNoFormat extends React.Component {
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
    if (value == "1"){
      this.props.value = "Yes";
    } else if (value == "2"){
      this.props.value = "No";
    }
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
