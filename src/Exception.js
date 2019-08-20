const { Exception } = require('geum');

/**
 * This is an exception marker so we specifically know what section threw it
 */
class SystemException extends Exception {}

//adapter
module.exports = SystemException;
