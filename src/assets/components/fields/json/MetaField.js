const Tag = require('./TagField');

class MetaField extends Tag {

  constructor() {
    super();
    this.props['data-do']= 'meta-field';
    this.props['class']= 'meta-field';
  }

  render() {
    const div = (
      <div class="field-row input-group mb-3">
                <input
                    class="meta-input key form-control system-form-control"
                    type="text"
                    placeholder="{{_ 'Key'}}"
                    value="{{@key}}"
                />
                <textarea
                    class="meta-input value form-control system-form-control"
                    placeholder="{{_ 'Value'}}"
                    rows="1"
                >{{this}}</textarea>
                <input
                    class="system-form-control"
                    type="hidden"
                    name="{{../@key}}[{{@key}}]"
                    value="{{this}}"
                />
                <div class="input-group-append">
                    <a
                        class="input-group-text text-danger remove"
                        href="javascript:void(0)"
                    >
                        <i class="fas fa-times"></i>
                    </a>
                </div>
            </div>);
    const btn = (<a class="field-add btn btn-success" href="javascript:void(0)">
              <i class="fas fa-plus"></i>
              <span>{{_ 'Add'}}</span>
          </a>);
    return React.createElement('div', this.props, div, btn);
  }
}
