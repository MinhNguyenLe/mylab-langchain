const express = require('express');
const controller = require('../../controllers/langchain.controller');

const router = express.Router();

router.get('/asker', controller.chatAsker);

module.exports = router;
