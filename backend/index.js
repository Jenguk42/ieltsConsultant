require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
// const serverless = require("serverless-http");
const express = require('express');
var cors = require('cors');
const app = express();

// Import OpenAI
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Add CORS 
// let corsOptions = {
//   origin: 'https://ieltsconsultant-front.pages.dev/',
//   credentials: true
// }
// app.use(cors(corsOptions));
app.use(cors());

// Allow POST method
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Create messages for ChatGPT
let initMessages = [
  { role: "system", content: "I am a very skilled and experienced IELTS course consultant. My name is Jenny. I have vast knowledge about IELTS study tips based on the official IELTS website and can answer any questions, is helpful, insightful, clever, and friendly. I can also suggest schedules specific to the student's current level. I gain information about the student's grammar and vocabulary level during the conversation, spotting errors. When suggesting something, I find and attach an existing link on the web that does not return a 404 error. I start the conversation by greeting the student. I give precise answers, and ask for information to create specific answers for each student." },
  { role: "user", content: "You are a very skilled and experienced IELTS course consultant. Your name is Jenny. You have vast knowledge about IELTS study tips based on the official IELTS website and can answer any questions, is helpful, insightful, clever, and friendly. You can also suggest schedules specific to the student's current level. You also gain information about the student's grammar and vocabulary level during the conversation, spotting errors. When suggesting something, you find and attach an existing link on the web that does not return a 404 error. You start the conversation by greeting the student. You give precise answers, and ask for information to create specific answers for each student." },
  { role: "assistant", content: "Welcome to our IELTS course consultancy service. My name is Jenny, and I am here to assist you with any questions or concerns you may have about studying for the IELTS exam. How can I help you today?" }
];

// POST method route
app.post("/ieltsConsultant", async function (req, res) {
  let { hasTakenTest, listeningBand, readingBand, writingBand, speakingBand, elaboration, userMessages, botMessages } = req.body

  console.log(hasTakenTest, listeningBand, readingBand, writingBand, speakingBand, elaboration, userMessages, botMessages);
  
  // If user provided their background, add it to the initMessages
  if (hasTakenTest != null) {
    let userBackground = { role: "user", content: hasTakenTest ? `I have taken the IELTS test before. I got ${listeningBand} for listening, ${readingBand} for reading, ${writingBand} for writing, and ${speakingBand} for speaking. ${elaboration}` : `I have not taken the IELTS test before. ${elaboration}` };
    initMessages.push(userBackground);
  }

  // Add all given messages into a list, use them when calling ChatGPT
  let newMessages = [];
  while (userMessages.length != 0 || botMessages.length != 0) {
    if (userMessages.length != 0) {
      newMessages.push(
        // Replace parse the messages into JSON, removing any impurities
        JSON.parse('{"role": "user", "content": "'+String(userMessages.shift()).replace(/\n/g,"")+'"}')
      )
    }
    if (botMessages.length != 0) {
      newMessages.push(
        JSON.parse('{"role": "assistant", "content": "'+String(botMessages.shift()).replace(/\n/g,"")+'"}')
      )
    }
  }
  console.log("====================================")

  // Call ChatGPT
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 2000,
    temperature: 0.8,
    messages: initMessages.concat(newMessages)
  });

  let answer = completion.data.choices[0].message['content'];
  newMessages.push(answer);
  res.json({ "assistant": answer });
  console.log(initMessages.concat(newMessages));
});

// Listen to port 3000
app.listen(3000)
// module.exports.handler = serverless(app);