const Text = require('../string/TextField')

class TimeField extends Text {
  /**
   * Sets input type to date
   */

   get schema() {
     return { type: 'time'};
   }
  constructor() {
    super();
    this.props['aria-haspopup']= 'true';
    this.props['aria-expanded']= 'false';
    this.props['class'] = 'form-control date system-form-control';
    this.props['data-do'] = 'time-field';
  }
}
