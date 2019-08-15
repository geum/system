const production = process.env.NODE_ENV === 'production';

// react browser
if (process.browser) {
  module.exports = production ?
    require('./dist/react.prod.js') :
    require('./dist/react.dev.js');

// node
} else {

}
