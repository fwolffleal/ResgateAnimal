const express = require('express');
const routes = require('./routes');
const cors = require('cors');
	
const router = express();

router.use(cors());
router.use(express.json());
router.use(routes);

router.listen(3333);

module.exports = router;
