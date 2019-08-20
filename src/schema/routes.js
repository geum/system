const { Http } = require('geum');
const router = Http.Router.load();

router.get('/admin/system/schema/search', (req, res) {});
router.get('/admin/system/schema/create', (req, res) {});
router.get('/admin/system/schema/remove/:name', (req, res) {});
router.get('/admin/system/schema/restore/:name', (req, res) {});
router.get('/admin/system/schema/update/:name', (req, res) {});
router.post('/admin/system/schema/create', (req, res) {});
router.post('/admin/system/schema/update/:name', (req, res) {});
router.post('/admin/system/schema/import', (req, res) {});
router.get('/admin/system/schema/export', (req, res) {});
router.get('/admin/system/schema/export/:name', (req, res) {});

module.exports = router;
