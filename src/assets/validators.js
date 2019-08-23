module.exports = {
  
  /**
   * Checks the validity of a credit card number
   *
   * @param {Integer} value
   *
   * @return {Boolean}
   */
  cc(value) {
    //general regex for Visa, MasterCard, American Express, Diners Club, Discover, and JCB cards
    const gen = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    
    if (value.match(gen)) {
      return true;
    }
    else {
      alert("Not a valid credit card number!");
      return false;
    }
  },
  
  /**
   * Checks the length of a string if it is greater than the challenge
   *
   * @param {String} value
   * @param {Integer|Float} challenge
   *
   * @return {Boolean}
   */
  char_gt(value, challenge) {
    //char value.length vs challenge
    return value.length > challenge
  },

  /**
   * Checks the length of a string if it is greater or equal to than the challenge
   *
   * @param {String} value
   * @param {Integer|Float} challenge
   *
   * @return {Boolean}
   */
  char_gte(value, challenge) {
    return value.length >= challenge
  },

  /**
   * Checks the length of a string if it is lesser than the challenge
   *
   * @param {String} value
   * @param {Integer|Float} challenge
   *
   * @return {Boolean}
   */

  char_lt(value, challenge) {
    return value.length < challenge
  },

  /**
   * Checks the length of a string if it is lesser than or equal to the challenge
   *
   * @param {String} value
   * @param {Integer|Float} challenge
   *
   * @return {Boolean}
   */
  char_lte(value, challenge) {
    return value.length >= challenge
  },

  /**
   * Checks the value of a date in epoch if it is greater than the challenge
   *
   * @param {String} value
   * @param {String} challenge
   *
   * @return {Boolean}
   */
  date_gt(value, challenge) {
    const v1 = Date.parse(value);
    const v2 = Date.parse(challenge);
    return v1 > v2;
  },

  /**
   * Checks the value of a date in epoch if it is greater than or equal to the challenge
   *
   * @param {String} value
   * @param {String} challenge
   *
   * @return {Boolean}
   */
  date_gte(value, challenge) {
    const v1 = Date.parse(value);
    const v2 = Date.parse(challenge);
    return v1 >= v2;
  },

  /**
   * Checks the value of a date in epoch if it is less than the challenge
   *
   * @param {String} value
   * @param {String} challenge
   *
   * @return {Boolean}
   */
  date_lt(value, challenge) {
    const v1 = Date.parse(value);
    const v2 = Date.parse(challenge);
    return v1 < v2;  },

  /**
   * Checks the value of a date in epoch if it is less than or equal to the challenge
   *
   * @param {String} value
   * @param {String} challenge
   *
   * @return {Boolean}
   */
  date_lte(value, challenge) {
    const v1 = Date.parse(value);
    const v2 = Date.parse(challenge);
    return v1 <= v2;
  },
  
  is_date(value) {
    //format: ^YYYY-MM-DD$
    if (Object.prototype.toString.call(value) === '[object Date]')
      return true;
    return false;   
  },
  
  is_datetime(value) {
    //format: ^YYYY-MM-DD HH:MM:SS$
  },

  /**
   * Checks the value of a date in epoch if it is less than or equal to the challenge
   *
   * @param {String} mail
   *
   * @return {Boolean}
   */
  is_email(mail) {
    //regex for email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w2,3})+$/.test(mail))
      return true;
    return false;
  },

  /**
   * Checks the value if it is a float number
   *
   * @param {String} value
   *
   * @return {Boolean}
   */
  is_float(value) {
    if (/\-?\d+\.\d+/.test(value))
      return true;
    return false;
  },

  /**
   * Checks the value if it is a hexadecimal number
   *
   * @param {String} value
   *
   * @return {Boolean}
   */
  is_hex(value) {
    //regex for hex
    if (/^[0-9a-fA-F]+$/.test(value))
      return true;
    return false;
  },

  /**
   * Checks the value if it is a number
   *
   * @param {String} value
   *
   * @return {Boolean}
   */
  is_number(value) {
    if (!isNaN(value))
      return true;
    return false;
  },

  /**
   * Checks the value if it is in a price format such as the following:
   * 1,000.00
   * 1,0000.00
   * 112487593785197900000.00
   * 11,000.22
   * 13,000,000
   * 123151
   *
   * @param {String} value
   *
   * @return {Boolean}
   */
  is_price(value) {
    if (/^\d+(,\d{3})*(\.\d{2})?$/.test(value))
      return true;
    return false;
  },

  is_time(value) {
    //format: ^HH:MM:SS$
  },
  
  /**
   * Checks the value if it is a url such as the following:
   *  https://www.sample.com
   *  http://www.sample.com
   *  www.sample.com
   *  sample.com
   *  http://blog.sample.com
   *  http://www.sample.com/product
   *  http://www.sample.com/products?id=1&page=2
   *  http://www.sample.com#up
   *  http://255.255.255.255
   *  255.255.255.255
   *  http://sample.com/perl.cgi?key=
   *  http://sample.com/cgi-bin/perl.cgi?key1=value1&key2
   *  http://www.sample.com:8008
   *
   * @param {String} value
   *
   * @return {Boolean}
   */
  is_url(value) {
    if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value))
      return true;
    return false;
  },
  
  /**
   * Checks the value of a number if it is greater than the challenge
   *
   * @param {Integer|Float} value
   * @param {Integer|Float} challenge
   *
   * @return {Boolean}
   */
  number_gt(value, challenge) {
    return value > challenge;
  },
  /**
   * Checks the value of a number if it is greater than or equal to the challenge
   *
   * @param {Integer|Float} value
   * @param {Integer|Float} challenge
   *
   * @return {Boolean}
   */
  number_gte(value, challenge) {
    return value >= challenge;
  },

  /**
   * Checks the value of a number if it is less than the challenge
   *
   * @param {Integer|Float} value
   * @param {Integer|Float} challenge
   *
   * @return {Boolean}
   */
  number_lt(value, challenge) {
    return value < challenge;
  },

  /**
   * Checks the value of a number if it is less than or equal to the challenge
   *
   * @param {Integer|Float} value
   * @param {Integer|Float} challenge
   *
   * @return {Boolean}
   */
  number_lte(value, challenge) {
    return value <= challenge;
  },

  /**
   * Checks the value of a field if it is empty or not
   *
   * @param {String} value
   *
   * @return {Boolean}
   */
  not_empty(value) {
    if (value.length > 0)
  	  return true
    return false
  },
  
  /**
   * Checks the value of a field is undefined
   *
   * @param {Integer|Float} value
   *
   * @return {Boolean}
   */
  not_defined(value) {
    if (typeof value === "undefined")
      return true
    return false
  },

  word_gt(value, challenge) {},
  word_gte(value, challenge) {},
  word_lt(value, challenge) {},
  word_lte(value, challenge) {},

  valid_option(value, challenge) {},
  valid_regexp(value, challenge) {}
};
