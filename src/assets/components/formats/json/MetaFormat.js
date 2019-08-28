const React = require('react');

class MetaFormat extends React.Component {
  /**
   * @var {Component} parameters - Getter only
   */
  get parameters() {
    return null;
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
      <ul class="meta-list"
        {this.props.value.map((val, i) => {
          return (
            <li>
              <span class="key">{i}</span>
              <span class="this">{val}</span>
            </li>
          ));
        })}
      </ul>
  }
}
