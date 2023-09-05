const TelegramBot = require('node-telegram-bot-api');

const token = '6670579675:AAFIQRTo34R_Ov7ZZNrE9EFhcO3ZLnvcvvg';
const bot = new TelegramBot(token, {polling: true});

let ServerText = ''

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  
  if(msg.text === '/start'){
    return await bot.sendMessage(chatId, 'You are Welcome', {
      reply_markup: {
        keyboard: [
          [{text: 'Web Site', web_app: {url: 'https://rococo-seahorse-ab614b.netlify.app/'}}]
        ]
      }
    })
  }
  if(msg.text === '/lastorder'){
    return await bot.sendMessage(chatId, ServerText)
  }

  if(msg?.web_app_data?.data){
    try {
      const {basket, address} = JSON.parse(msg.web_app_data.data)
      ServerText = 'Your Order:\n'
      
      basket.map(item => {
        ServerText = ServerText + `${item.name}  x${item.amount}  $${Number(item.price)}  =>  $${Number(item.price) * Number(item.amount)}` + '\n'
      })

      return await bot.sendMessage(chatId, ServerText)

    } catch (error) {
      console.log(error)
    }
  }
  return await bot.sendMessage(chatId, msg.text);
  
});
