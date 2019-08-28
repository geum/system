//using ('html-to-react').Parser
//using 'react-dom/server'
const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const HtmlToReactParser = require('html-to-react').Parser;

class RawHtmlFormat extends React.Component {
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
    var parser = new HtmlToReactParser();
    var element = parser.parse(value);
    this.props.value = ReactDOMServer.renderToStaticMarkup(element);
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
