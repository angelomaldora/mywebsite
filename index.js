





const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8266;

app.get('/', (req, res) => {
  const { username, count } = req.query;

  if (!username || !count) {
    return res.status(400).json({ error: 'Username and count parameters are required.' });
  }

  sendMessages(username, parseInt(count))
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

async function sendMessages(nglUsername, count) {
  let sentCount = 0;
  let notSendCount = 0;
  const messagesArray = [

    "Who is your first crush?",

    "What is your favorite childhood memory?",

    "What is your biggest regret?",

    "What is your dream job?",

    "Where do you see yourself in 5 years?",

    "What is your favorite movie?",

    "What is your favorite book?",

    "What is your favorite food?",

    "What is your biggest fear?",

    "What is your proudest accomplishment?",

    "If you could travel anywhere in the world, where would you go?",

    "What is your favorite hobby?",

    "What is your favorite music band?",

    "What is your favorite song?",

    "What is your favorite season?",

    "What is your favorite holiday?",

    "What is your pet peeve?",

    "What is your favorite ice cream flavor?",

    "What is your favorite sport?",

    "What is your favorite TV show?"

];

  for (let i = 0; i < count; i++) {
    const message = messagesArray[Math.floor(Math.random() * messagesArray.length)];

    try {
      const response = await axios.post('https://ngl.link/api/submit', {
        username: nglUsername,
        question: message,
        deviceId: '0',
        gameSlug: '',
        referrer: ''
      }, {
        headers: {
          'Host': 'ngl.link',
          'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
          'accept': '*/*',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-requested-with': 'XMLHttpRequest',
          'sec-ch-ua-mobile': '?0',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
          'sec-ch-ua-platform': '"Windows"',
          'origin': 'https://ngl.link',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'referer': `https://ngl.link/${nglUsername}`,
          'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
        }
      });

      if (response.status === 200) {
        sentCount++;
      } else {
        notSendCount++;
      }
    } catch (error) {
      notSendCount++;
    }

    // Sleep for 1 second between requests
    await sleep(1000);
  }

  return { sentCount, notSendCount };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
