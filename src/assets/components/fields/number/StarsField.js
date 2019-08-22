const Text = require('../string/TextField');

class StarsField extends Text {

  get schema() {
    return { type: 'FLOAT', length: '10,1'};
  }

  constructor() {
    super();
    this.props['class'] = 'stars-field';
    this.props['data-do'] = 'stars-field';
  }

  render(){
    const star = ({{#if config.attributes.data-max}}
            {{#stars this config.attributes.data-max}}
                <div class="star d-inline-block">
                    {{#when this '===' 'half'}}
                        <i class="fas fa-star-half-alt text-warning"></i>
                    {{/when}}

                    {{#when this '===' 'whole'}}
                        <i class="fas fa-star text-warning"></i>
                    {{/when}}

                    {{#when this '===' 'empty'}}
                        <i class="far fa-star"></i>
                    {{/when}}
                </div>
            {{/stars}}
        {{else}}
            {{#stars this 5}}
                <div class="star d-inline-block">
                    {{#when this '===' 'half'}}
                        <i class="fas fa-star-half-alt text-warning"></i>
                    {{/when}}

                    {{#when this '===' 'whole'}}
                        <i class="fas fa-star text-warning"></i>
                    {{/when}}

                    {{#when this '===' 'empty'}}
                        <i class="far fa-star"></i>
                    {{/when}}
                </div>
            {{/stars}}
        {{/if}});
    const inp = (<input
            autocomplete="{{name}}"
            class="form-control system-form-control hidden"
            step="0.5"
            min="0"
            name="{{@key}}"
            type="number"
            value="{{this}}"
            {{#each config.attributes}}
                {{@key}}="{{this}}"
            {{/each}}
        />);
    return React.createElement('div', this.props, star, inp);
  }
}
