const React = require('react');

class CharLengthFormat extends React.Component {
    /**
     * @var {Component} parameters - Getter only
     */
  get parameters() {
    return (
      <span>
        <input name="{this.props.name}[parameters][0]" type="text" placeholder="How many characters" />
      </span>
    );
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    this.props.value = value.substring(0,this.props.parameters[0]);
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
