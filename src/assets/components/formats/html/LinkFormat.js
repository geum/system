const React = require('react');

class LinkFormat extends React.Component {
  get parameters() {
    /**
     * @var {Component} parameters - Getter only
     */
    get parameters() {
      return (
        <span>
          <input name="{this.props.name}[parameters][0]" type="text" placeholder="ie. /node/{{node_id}}" />
          <input name="{this.props.name}[parameters][1]" type="text" placeholder="Label or {{value}}" />
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

      <a href="{this.props.parameters[0]}">{this.props.parameters[1]}</a>
    );
  }
}
