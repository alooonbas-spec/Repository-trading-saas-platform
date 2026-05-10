export async function sendTelegramMessage(text) {
  const token = process.env.8535957623:AAENJiOG_COieXSIopLBomcNW2kfterlYmw;
  const chatId = process.env.123456789;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });
}