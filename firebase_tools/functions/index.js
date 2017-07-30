// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require('firebase-functions');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');

function telegramSendMessage(req, res){
  const token = '343017356:AAEk25x5-6nvFafhoHJP4wCYHTNp3RJMXTk';
  const bot = new TelegramBot(token, {polling: true});
  const chatId = '@ng_lab_hobbit_chanel';
  const text = `New event ${req.body.text} added`;
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{text: 'Join!', callback_data: 'yes'}],
        [{text: 'No thanks', callback_data: 'no'}]
      ]
    }
  };

  bot.on('callback_query', function onCallbackQuery(msg) {
    let user = msg.from;
    bot.sendMessage(chatId, `${user.first_name} clicked button with data ${msg.data}`);
  });

  bot.sendMessage(chatId, text, options).then( () => {
    res.status(200).json({success:true});
  }).catch( () => {
    res.status(500).json({success:false});
  });
}

exports.TelegramSendMessage = functions.https.onRequest((req, res) => {
  const corsFn = cors();
  corsFn(req, res, function() {
    telegramSendMessage(req, res);
  });
});
