const TelegramBot = require('node-telegram-bot-api');
const { text1, text2 } = require('./src/modules/textComand')



const token = '6435610086:AAHnrCYeHxM-A3foTZXvu6k-UeSRbC7nTpk';
const bot = new TelegramBot(token, { polling: true, parse_mode: 'HTML' });
let againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Возврат товара надлежащего качества', callback_data: '/command1' }],
      [{ text: 'Возврат товара НЕнадлежащего качества', callback_data: '/command2' }],
      [{ text: 'Возврат товара по браку в приложении Wildberries', callback_data: '/command3' }],
      [{ text: 'Как задать вопрос по работе с заказом.', callback_data: '/command4' }],
    ]
  })
}

const chats = {}

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начало работы с ботом' },
  ])

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const firstТame = msg.chat.first_name;
    const text = msg.text;

    if (text === "/start") {
      await bot.sendMessage(chatId, "<b>Выберете ваш случай</b>", {
        parse_mode: 'HTML',
        reply_markup: againOptions.reply_markup
      });
    }
  });

  bot.on('callback_query', async (msg) => {
    const data = msg.data
    const chatId = msg.message.chat.id;

    try {
      switch (data) {
        case '/command1':
          await bot.sendMessage(chatId, text1, { parse_mode: 'HTML' })
          break;

        case '/command2':
          await bot.sendMessage(chatId, text2, { parse_mode: 'HTML' })
          break;

        case '/command3':

          await bot.sendMessage(chatId, `⦁	Запустите приложение Wildberries
⦁	Перейдите в «Профиль»      
                `, { parse_mode: 'HTML' })
          await bot.sendPhoto(chatId, './src/img/image1.png')
          await bot.sendMessage(chatId, `⦁	Нажмите «Возврат товара по браку»`, { parse_mode: 'HTML' })
          await bot.sendPhoto(chatId, './src/img/image3.png')
          await bot.sendMessage(chatId, `⦁	Нажмите «СОЗДАТЬ ЗАЯВКУ»`, { parse_mode: 'HTML' })
          await bot.sendPhoto(chatId, './src/img/image2.png')
          await bot.sendMessage(chatId, `⦁	Выберите товар для возврата`, { parse_mode: 'HTML' })
          await bot.sendPhoto(chatId, './src/img/image5.png')
          await bot.sendMessage(chatId, `⦁	Прикрепите видео и фотографии в соответствии с требованиями`, { parse_mode: 'HTML' })
          await bot.sendPhoto(chatId, './src/img/image4.png')
          await bot.sendMessage(chatId, `⦁	Нажмите «ОТПРАВИТЬ»
⦁	Результат рассмотрения заявки придет в «Уведомления»`)
          await bot.sendPhoto(chatId, './src/img/image6.png')
          await bot.sendMessage(chatId, `⦁	Если заявка одобрена, товар можно нести в ПВЗ.
⦁	Если возврат отклонён, создайте повторную заявку, показав дефекты более явным образом.`)
          break;

        case '/command4':
          await bot.sendMessage(chatId, `<b>Как задать вопрос по работе с заказом.</b>`, { parse_mode: 'HTML' })
          await bot.sendMessage(chatId, `⦁	Перейдите в «Профиль»`, { parse_mode: 'HTML' })
          await bot.sendPhoto(chatId, './src/img/image1.png')
          await bot.sendMessage(chatId, `⦁	Нажмите «Задать вопрос»`, { parse_mode: 'HTML' })
          await bot.sendPhoto(chatId, './src/img/image8.png')
          await bot.sendPhoto(chatId, './src/img/image7.png')
          await bot.sendMessage(chatId, `⦁	Выберите тему обращения`, { parse_mode: 'HTML' })
          await bot.sendPhoto(chatId, './src/img/image9.jpg')
          break;

      }
    } catch (error) {
      console.log(error + ' ERROR')
    }
  })
}

start()