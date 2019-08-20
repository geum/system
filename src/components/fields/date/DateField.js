const Text = require('../string/Text')

class DateField extends Text {
  /**
   * Sets input type to date
   */
  constructor() {
    super();
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
