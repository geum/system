const React = require('react');

class ImageFormat extends React.Component {
  get parameters() {
    /**
     * @var {Component} parameters - Getter only
     */
    get parameters() {
      return (
        <span>
          <input name="{this.props.name}[parameters][0]" type="text" placeholder="Width" />
          <input name="{this.props.name}[parameters][1]" type="text" placeholder="Height" />
        </span>
      );
    }

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
      <img
        src="{this.props.value}"
        width={!!(this.props.parameters[0]) ? "{this.props.parameters[0]}" : false}
        height={!!(this.props.parameters[1]) ? "{this.props.parameters[1]}" : false}
      />
    );
  }
}
