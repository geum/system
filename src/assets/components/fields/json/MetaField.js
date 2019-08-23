const Tag = require('./TagField');

class MetaField extends Tag {

  constructor() {
    super();
    this.props['data-do']= 'meta-field';
    this.props['class']= 'meta-field';
    this.props['data-name'] = this.state.key;
  }

  render() { 
    return (
      React.createElement('div', this.props,
      React.createElement('div', {class: 'field-row input-group-mb3'},
      React.createElement('input', {class: 'meta-input key form-control system-form-control',
      type: 'text',
      placeholder: 'Key',
      value: this.state.key}),

      React.createElement('textarea', {class: 'meta-input value form-control system-form-control',
      placeholder: 'Value',
      rows: '1'}, this.state),

      React.createElement('input', {class: 'system-form-control',
      type: 'hidden',
      name: this.state.key[this.state.key],
      value: this.state})

      React.createElement('div', {class: 'input-group-append'},
      React.createElement('a', {class: 'input-group-text text-danger remove',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-times'}))))

      React.createElement('a', {class: 'field-add btn btn-success',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-plus'},
      React.createElement('span', 'Add'))))
    );
  }
}
