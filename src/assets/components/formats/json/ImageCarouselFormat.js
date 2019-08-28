//array of strings (image urls) and then join them together

const React = require('react');

class ImageCarouselFormat extends React.Component {
  /**
   * @var {Component} parameters - Getter only
   */
  get parameters() {
    return(
      <span>
        <input name="{this.props.name}[parameters][0]" type="text" placeholder="Width" />
        <input name="{this.props.name}[parameters][1]" type="text" placeholder="Height" />
      </span>
    );
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

  render(){
    return (
      <div class="carousel slide" data-do="carousel" data-width="this.props.parameters[0]" data-height="this.props.parameters[1]">
      <div class="carousel-inner">
      {this.props.value.map((val, i) => {
        if (i == 0){
          return(
            <div class="carousel-item text center active">
            <img class="m-auto" src={val} height={!!(this.props.parameters[1]) ? "{this.props.parameters[1]}" : false}/>
          );
        }
        return(
          <div class="carousel-item text center">
          <img class="m-auto" src={val} height={!!(this.props.parameters[1]) ? "{this.props.parameters[1]}" : false}/>
        );
      })}
      <a class="carousel-control-prev" role="button">
        <i class="fas fa-chevron-left"></i>
      </a>
      <a class="carousel-control-next" role="button">
        <i class="fas fa-chevron-right>"></i>
      </a>
    </div>
    );
  }
}
