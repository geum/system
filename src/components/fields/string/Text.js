class Text {
  /**
   * @var {String} attributes - What kind of SQL schema
   */
  get schema() {}

  /**
   * Render as a field
   *
   * @param {String} value
   * @param {Object} [attributes = {}]
   *
   * @return {String}
   */
  field(value, attributes = {}) {}

  /**
   * What happens before it is inserted/updated
   *
   * @param {String} value
   *
   * @return {String}
   */
  process(value) {}
}
