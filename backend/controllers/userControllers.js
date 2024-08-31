const puppeteer = require("puppeteer");
const { spawn } = require("child_process");
const axios = require("axios");

async function crawler(req, res) {
  const url =
    "http://qazkxav4zzmt5xwfw6my362jdwhzrcafz7qpd5kugfgx7z7il5lyb6ad.onion/";

  const browser = await puppeteer.launch({
    args: [
      "--proxy-server=socks5://127.0.0.1:9150", // This is the default SOCKS proxy address for Tor
    ],
  });
  const page = await browser.newPage();
  await page.goto(url);
  const bodyContent = await page.$eval("body", (body) => body.textContent);
  res.json({
    data: bodyContent,
  });
  await browser.close();
}

async function process(req, res) {
  const { data } = req.body;
  console.log(data);
  const pythonProcess = spawn("python", ["controllers/preProcessing.py", data]);
  [];
  pythonProcess.stdout.on("data", (data) => {
    console.log([
      data.toString().slice(0, data.toString().indexOf(",") - 1),
      data.toString().slice(data.toString().indexOf(",") + 1),
    ]);
    res.send([
      data.toString().slice(0, data.toString().indexOf(",") - 1),
      data.toString().slice(data.toString().indexOf(",") + 1),
    ]);
  });

  // Listen for errors from Python script
  pythonProcess.stderr.on("data", (data) => {
    console.error("Error from Python script:", data.toString());
  });

  // Handle Python script exit
  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
  });
}

async function chat(req, res) {
  const options = {
    method: "POST",
    url: "https://chat-gpt26.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "chat-gpt26.p.rapidapi.com",
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "what is cyber attack",
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    res.send(response.data.choices[0].message.content);
  } catch (error) {
    res.send(error);
  }
}
module.exports = { crawler, process, chat };
