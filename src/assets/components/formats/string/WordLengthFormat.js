const React = require('react');

class WordLengthFormat extends React.Component {
    /**
     * @var {Component} parameters - Getter only
     */
  get parameters() {
    return (
      <span>
        <input name="{this.props.name}[parameters][0]" type="text" placeholder="How many words" />
      </span>
    );
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    var arr = value.split(" ",this.props.parameters[0]);
    this.props.value = arr.join();
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
