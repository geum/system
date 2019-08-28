const React = require('react');

class StripHtmlFormat extends React.Component {
  get parameters() {
    /**
     * @var {Component} parameters - Getter only
     */
    get parameters() {
      return (
        <span>
          <input name="{this.props.name}[parameters][0]" type="text" placeholder="Allowed Tags ie: <a><b><i>..." />
        </span>
      );
    }

  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    const regex = /(<([^>]+)>)/ig;
    this.props.value = value.replace(regex, '');
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
