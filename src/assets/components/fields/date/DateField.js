const Text = require('../string/TextField')

class DateField extends Text {
  /**
   * Sets input type to date
   */

   get schema() {
     return { type: 'date'};
   }

  constructor() {
    super();
    this.props['aria-haspopup']= 'true';
    this.props['aria-expanded']= 'false';
    this.props['class'] = 'form-control date system-form-control';
    this.props['data-do'] = 'date-field';
    this.props.type = 'date';
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
