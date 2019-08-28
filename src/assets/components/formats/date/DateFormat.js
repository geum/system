const React = require('react');

class DateFormat extends React.Component {
  get parameters() {
    /**
     * @var {Component} parameters - Getter only
     */
    get parameters() {
      return (
        <span>
          <input name="{this.props.name}[parameters][0]" type="text" placeholder="Date Format" />
        </span>
      );
    }

  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    if (value){
      this.props.value = value;
    }
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return this.props.parameters;
  }
}
