const Text = require('../string/TextField')

class MonthField extends Text {
  /**
   * Sets input type to date
   */
  constructor() {
    super();
    this.props['autocomplete'] = 'off';
    this.props['class'] = 'form-control system-form-control';
    this.props['data-do'] = 'time-field';
    this.props.type = 'month';
  }
}
