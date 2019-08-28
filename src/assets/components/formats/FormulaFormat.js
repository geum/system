const React = require('react');

class FormulaFormat extends React.Component {
  /**
   * @var {Component} parameters - Getter only
   */
  get parameters() {
    return (
      <textarea name="{this.props.name}[parameters][0]" placeholder="({{salary}} * {{tax}}) / 10"></textarea>
    );
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    //using the formula in the placeholder
    var arr = value.split(" ");

    this.props.value = (arr[0] * arr[1])/10;
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return this.props.value;
  }
}
