const React = require('react');

class StarsField extends React.Component {

  get schema() {
    return { type: 'FLOAT', length: '10,1' };
  }

  get types(){
    return ['file', 'json'];
  }

  /**
   * @var {Object} attributes - Setter only
   */
  set attributes(attributes) {
    if (typeof attributes !== 'object') {
      //dont add
      return;
    }

    Object.assign(this.props, attributes);
  }

  /**
   * @var {Object} options - Setter only
   */
  set options(options) {
    if (typeof options !== 'object') {
      //dont add
      return;
    }

    this.options = options;
  }

  /**
   * @var {String} value - Setter only
   */
  set value(value) {
    this.props.value = value;
  }

  static isJsonType(){
    return false;
  }

  static isFileType(){
    return false;
  }

  constructor() {
    super();
    this.props['class'] = 'stars-field';
    this.props['data-do'] = 'stars-field';
  }

  render(){
    if (config.attributes['data-max']){
      if (stars.config.attributes['data-max'] == 'half'){
        return (React.createElement('div', {class: 'star d-inline-block'},
          React.createElement('i', {class: 'fas fa-star-half-alt text-warning'}),
          React.createElement('input', {autocomplete: this.state.name,
          class: 'form-control system-form-control hidden',
          step: '0.5',
          min: '0',
          name: this.state.key,
          type: 'number',
          value: this.props.value})));
      } else if (stars.config.attributes['data-max'] == 'whole'){
        return (React.createElement('div', {class: 'star d-inline-block'},
          React.createElement('i', {class: 'fas fa-star text-warning'}),
          React.createElement('input', {autocomplete: this.state.name,
          class: 'form-control system-form-control hidden',
          step: '0.5',
          min: '0',
          name: this.state.key,
          type: 'number',
          value: this.props.value})));
      } else if (stars.config.attributes['data-max'] == 'empty'){
        return (React.createElement('div', {class: 'star d-inline-block'},
          React.createElement('i', {class: 'far fa-star'}),
          React.createElement('input', {autocomplete: this.state.name,
          class: 'form-control system-form-control hidden',
          step: '0.5',
          min: '0',
          name: this.state.key,
          type: 'number',
          value: this.props.value})));
      }
    } else { //definitely not right
      if (stars == 'half'){
        return (React.createElement('div', {class: 'star d-inline-block'},
          React.createElement('i', {class: 'fas fa-star-half-alt text-warning'}),
          React.createElement('input', {autocomplete: this.state.name,
          class: 'form-control system-form-control hidden',
          step: '0.5',
          min: '0',
          name: this.state.key,
          type: 'number',
          value: this.props.value})));
      } else if (stars == 'whole'){
        return (React.createElement('div', {class: 'star d-inline-block'},
          React.createElement('i', {class: 'fas fa-star text-warning'}),
          React.createElement('input', {autocomplete: this.state.name,
          class: 'form-control system-form-control hidden',
          step: '0.5',
          min: '0',
          name: this.state.key,
          type: 'number',
          value: this.props.value})));
      } else if (stars == 'empty'){
        return (React.createElement('div', {class: 'star d-inline-block'},
          React.createElement('i', {class: 'far fa-star'}),
          React.createElement('input', {autocomplete: this.state.name,
          class: 'form-control system-form-control hidden',
          step: '0.5',
          min: '0',
          name: this.state.key,
          type: 'number',
          value: this.props.value})));
      }
    }
  }
}
