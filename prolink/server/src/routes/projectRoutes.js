const router = require('express').Router();
const auth = require('../middleware/authMeddleware.js');
const { generateProject ,  generateFileContent , generateProjectSchema} = require('../controllers/projectController.js');

router.post('/generate' , auth , generateProject);
router.post('/file/:fileId/generate-content' , auth , generateFileContent);
router.post('/:projectId/generate-schema' , auth , generateProjectSchema);

module.exports = router;