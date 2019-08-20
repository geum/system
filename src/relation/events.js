const { EventEmitter } = require('geum');
const events = EventEmitter.load();

events.on('system-schema-create', (req, res) {});
events.on('system-schema-detail', (req, res) {});
events.on('system-schema-remove', (req, res) {});
events.on('system-schema-search', (req, res) {});
events.on('system-schema-update', (req, res) {});

module.exports = events;
