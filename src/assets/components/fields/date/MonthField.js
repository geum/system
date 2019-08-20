const Text = require('../string/TextField')

class MonthField extends Text {
  /**
   * Sets input type to date
   */
  constructor() {
    super();
    this.props['class'] = 'form-control system-form-control';
    this.props['data-do'] = 'time-field';
    this.props.type = 'month';
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
