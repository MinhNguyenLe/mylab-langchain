// const httpStatus = require('http-status');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const express = require('express');

const router = express.Router();

const model = new ChatOpenAI({
  openAIApiKey: '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',
  temperature: 0.9,
});

function trainModel() {}
function communicateModel() {}

router.get('/communicate', communicateModel);
router.get('/train', trainModel);

module.exports = model;
