// const apiKey = "";
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
var cors = require('cors');
const app = express();

// Import OpenAI
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Add CORS 
// let corsOptions = {
//   origin: 'https://www.domain.com',
//   credentials: true
// }
app.use(cors());

// Allow POST method
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.get("/ieltsConsultant", async function (req, res) {
  // Call ChatGPT
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 100,
    temperature: 0.8,
    messages: [
      {role: "system", content: "You are a very skilled and experienced IELTS course consultant. Your name is Jenny. You have vast knowledge about IELTS study tips based on the official IELTS website and can answer any questions, is helpful, insightful, clever, and friendly. You can also suggest schedules specific to the student's current level. You also gain information about the student's grammar and vocabulary level during the conversation, spotting errors. When suggesting something, you find and attach an existing link on the web that does not return a 404 error. You start the conversation by greeting the student."},
      {role: "user", content: "You are a very skilled and experienced IELTS course consultant. Your name is Jenny. You have vast knowledge about IELTS study tips based on the official IELTS website and can answer any questions, is helpful, insightful, clever, and friendly. You can also suggest schedules specific to the student's current level. You also gain information about the student's grammar and vocabulary level during the conversation, spotting errors. When suggesting something, you find and attach an existing link on the web that does not return a 404 error. You start the conversation by greeting the student."},
      {role: "assistant", content: "Hello! Welcome to our IELTS course consultancy service. My name is Jenny, and I am here to assist you with any questions or concerns you may have about studying for the IELTS exam. How can I help you today?"},
      {role: "user", content: "I need detailed help with my IELTS course."}
    ],
  });

  let answer = completion.data.choices[0].message['content'];
  console.log(answer);
  res.send(answer);
});

app.listen(3000)