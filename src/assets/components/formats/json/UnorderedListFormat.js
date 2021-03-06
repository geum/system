const React = require('react');

class UnorderedListFormat extends React.Component {
  /**
   * @var {Component} parameters - Getter only
   */
  get parameters() {
    return null;
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) { //value can be an array
    this.props.value = value;
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return (
      <ul>
        {this.props.value.map((val) => {
          return (<li>{val}</li>));
        })}
      </ul>
    );
  }
}
