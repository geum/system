const { app, Registry } = require('geum');
const System = require('./System');

app.system = System.load();
