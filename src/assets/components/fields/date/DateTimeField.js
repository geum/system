const Text = require('../string/TextField')

class DateTimeField extends Text {
  /**
   * Sets input type to date
   */

   get schema() {
     return { type: 'datetime' };
   }

  constructor() {
    super();
    this.props['autocomplete'] = 'off';
    this.props['aria-haspopup']= 'true';
    this.props['aria-expanded']= 'false';
    this.props['class'] = 'form-control date system-form-control';
    this.props['data-do'] = 'datetime-field';
    this.props.type = 'text';
  }

  /**
   * What happens before it is inserted/updated
   *
   * @param {String} value
   *
   * @return {String}
   */
  prepare(value) {
    return new Date(value).toISOString().slice(0, 19).replace('T', ' ');
  }
}
