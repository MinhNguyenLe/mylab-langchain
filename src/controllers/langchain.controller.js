const httpStatus = require('http-status');

const { ChatOpenAI } = require('langchain/chat_models/openai');
const { ChatPromptTemplate } = require('langchain/prompts');
const { StringOutputParser } = require('langchain/schema/output_parser');
const catchAsync = require('../utils/catchAsync');

const model = new ChatOpenAI({
  openAIApiKey: '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',
  temperature: 0.9,
});

const template = `I have a business, please read more details in https://www.btaskee.com. 
You are a helpful assistant who support customer for my business.
You will support many customers who ask you about business's workflow.
I will identify each customer through their ID and send it to you.
Please help me remember the context for each user so I can answer them most accurately about the information they mentioned in the past.
We will give you data on questions and corresponding answers for many different scenarios about our business.
If you encounter a question from another customer that is completely or unrelated to the data you already know, please answer the exact question: I don't understand.
`;

const humanTemplate = '{text}';
const context = []
function updateContext(msg) {
  context.push(msg)
}

const chatAsker = catchAsync(async (req, res) => {
  const parser = new StringOutputParser();

  /**
 * Chat prompt for generating comma-separated lists. It combines the system
 * template and the human template.
 */
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', template],
    ['system', `My cleaning house service have price = 100.000VND in today, with any address and duration,
but in yesterday is 111.000VND`],
    ...context,
    ['human', humanTemplate],
  ]);


  const chain = chatPrompt.pipe(model).pipe(parser);
  console.log(context)
  updateContext(["human", req.query.text])
  const result = await chain.invoke({
    text: req.query.text,
  });

  res.status(httpStatus.OK).send({ message: 'test', data: result });
});

module.exports = {
  chatAsker,
};
