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
    //using the formula given
    //removes the {{}} and then works with whatever is inputted
    var next = value.replace(/{{}}/g,'');

    this.props.value = eval(next);
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
