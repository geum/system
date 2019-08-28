const React = require('react');

class StarRatingFormat extends React.Component {
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

  renderStar(){
    if (this.props.value.toLowerCase() == "half") {
      return (<i class="fas fa-star-half-alt"></i>);
    } else if (this.props.value.toLowerCase() == "whole") {
      return(<i class="fas fa-star"></i>);
    } else if (this.props.value.toLowerCase() == "empty") {
      return(<i class="far fa-star"></i>);
    }
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return (
      <span class="stars-rating text-warning">
      {renderStar()}
      </span>
    );
  }
}
