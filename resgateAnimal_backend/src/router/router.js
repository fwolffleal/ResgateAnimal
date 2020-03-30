const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');
	
const router = express();

router.use(cors());
router.use(express.json());
router.use(routes);
router.use(errors());

module.exports = router;
