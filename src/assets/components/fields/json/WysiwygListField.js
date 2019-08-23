const Tag = require('./TagField');

class WysiwygListField extends Tag {

  /**
   * Sets input type to text
   */
  constructor() {
    super();
    this.props['data-do'] = 'wysiwyglist-field';
    this.props['class'] = 'wysiwyglist-field';
    this.props['data-name'] = this.state.key;
  }

  /**
   * Render as a field
   *
   * @return {Component}
   */
  render() {
    return (
      React.createElement('div', this.props,
      React.createElement('div', {class: 'field-row mb-3'},
      React.createElement('div', {class: 'btn-group mb-2'},
      React.createElement('a', {class: 'btn btn-danger remove',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-times'})),

      React.createElement('a', {class: 'btn btn-danger move-up',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-arrow-up'})),

      React.createElement('a', {class: 'btn btn-orange move-down',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-arrow-down'}))),

      React.createElement('textarea', {['data-do']: 'wysiwyg',
      class: 'text-field form-control system-form-control',
      name: this.state.key}, this.state)),

      React.createElement('a', {class: 'field-add btn btn-success',
      href: 'javascript:void(0)'},
      React.createElement('i', {class: 'fas fa-plus'}),
      React.createElement('span', 'Add')));

    );
  }
}
