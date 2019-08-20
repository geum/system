const Text = require('../string/TextField');

class LatLngField extends Text {

  get schema() {
    return { type: 'JSON'};
  }

  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props.type = 'number';
    this.props['min'] = '-90';
    this.props['max'] = '90';
    this.props['step'] = '0.00000001';
    this.props['placeholder'] = 'Latitude';

  }

  render(){
    const lng = (<input
        autocomplete="{{name}}"
        class="form-control system-form-control"
        name="{{@key}}[1]"
        type="number"
        value="{{this.1}}"
        min="-180"
        max="180"
        step="0.00000001"
        placeholder="Longitude"
        {{#each config.attributes}}
            {{@key}}="{{this}}"
        {{/each}}/>);
    return React.createElement('input', this.props, lng);
  }
}
