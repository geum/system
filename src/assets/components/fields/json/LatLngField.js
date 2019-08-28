const Text = require('../string/TextField');

class LatLngField extends Text {

  get schema() {
    return { type: 'JSON'};
  }

  get types(){
    return [ 'json' ];
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['name'] = this.state.key[0];
    this.props.type = 'number';
    this.props.value = this.state.value[0]
    this.props['min'] = '-90';
    this.props['max'] = '90';
    this.props['step'] = '0.00000001';
    this.props['placeholder'] = 'Latitude';

  }

  render(){
    return (
      React.createElement('input', this.props,
      React.createElement('input', {autocomplete: this.state.name,
      class: 'form-control system-form-control',
      name: this.state.key[1],
      type: 'number',
      value: 'this.state.value[1]',
      min: '-180',
      max: '180',
      step: '0.00000001',
      placeholder: 'Longitude'}))
    );
  }
}
