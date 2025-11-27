// --- Финальная, рабочая версия "Умного" Мокового Сервера ---
import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
app.use(cors());
const server = http.createServer(app);

const FAKE_USERS_DB = {
  1: { id: 1, username: 'user1', email: 'user1@example.com' },
  2: { id: 2, username: 'user2', email: 'user2@example.com' },
  3: { id: 3, username: 'admin', email: 'admin@example.com' },
};
const messageHistory = [];

// --- HTTP-эндпоинты для истории ---
app.get('/chat/public', (req, res) => {
  console.log('HTTP GET: /chat/public');
  const publicHistory = messageHistory.filter(msg => msg.recipientId === null);
  res.json(publicHistory);
});

// ИСПРАВЛЕНО: Теперь эндпоинт принимает ID обоих участников чата
app.get('/chat/private/:user1Id/:user2Id', (req, res) => {
  const user1Id = parseInt(req.params.user1Id, 10);
  const user2Id = parseInt(req.params.user2Id, 10);
  console.log(`HTTP GET: /chat/private/${user1Id}/${user2Id}`);
  
  const privateHistory = messageHistory.filter(msg => 
    (msg.senderInfo.id === user1Id && msg.recipientId === user2Id) ||
    (msg.senderInfo.id === user2Id && msg.recipientId === user1Id)
  );
  res.json(privateHistory);
});

// --- WebSocket-сервер ---
const wss = new WebSocketServer({ server });
const clients = new Map();

wss.on('connection', (ws) => {
  const clientId = Date.now();
  clients.set(ws, { id: clientId, user: null, subscriptions: new Set() });
  console.log(`Клиент ${clientId} подключился.`);

  ws.on('message', (messageAsString) => {
    const messageStr = messageAsString.toString();
    const lines = messageStr.split('\n');
    const command = lines[0].trim();
    const clientInfo = clients.get(ws);

    if (command === 'CONNECT') {
      ws.send('CONNECTED\nversion:1.2\n\n\0');
      return;
    }
    if (command === 'SUBSCRIBE') {
      const destLine = lines.find(line => line.startsWith('destination:'));
      if (destLine) {
        const destination = destLine.substring('destination:'.length).trim();
        clientInfo.subscriptions.add(destination);
        if (destination.startsWith('/user/')) {
          const email = destination.split('/')[2];
          const user = Object.values(FAKE_USERS_DB).find(u => u.email === email);
          if (user) clientInfo.user = user;
        }
      }
      return;
    }
    if (command === 'SEND') {
      const bodyMatch = messageStr.match(/\n\n([\s\S]*)/);
      if (!bodyMatch) return;
      const body = bodyMatch[1].replace(/\0$/, '');
      const message = JSON.parse(body);

      const response = { ...message, id: Date.now(), sentAt: new Date().toISOString() };
      messageHistory.push(response);

      if (message.recipientId) {
        // --- ЛИЧНОЕ СООБЩЕНИЕ (ИСПРАВЛЕНО) ---
        const recipient = FAKE_USERS_DB[message.recipientId];
        const sender = FAKE_USERS_DB[message.senderInfo.id];
        if (!recipient || !sender) return;

        const privateMsgStomp = `MESSAGE\ndestination:/user/${recipient.email}/queue/messages\n\n${JSON.stringify(response)}\0`;
        const selfMsgStomp = `MESSAGE\ndestination:/user/${sender.email}/queue/messages\n\n${JSON.stringify(response)}\0`;

        clients.forEach((c, clientWs) => {
          if (c.user?.email === recipient.email) {
            console.log(`Отправляю личное сообщение для ${recipient.email}`);
            clientWs.send(privateMsgStomp);
          }
          if (c.user?.email === sender.email) {
            console.log(`Возвращаю эхо для ${sender.email}`);
            clientWs.send(selfMsgStomp);
          }
        });
      } else {
        // --- ПУБЛИЧНОЕ СООБЩЕНИЕ ---
        const publicMsgStomp = `MESSAGE\ndestination:/topic/public\n\n${JSON.stringify(response)}\0`;
        clients.forEach((c, clientWs) => {
          if (c.subscriptions.has('/topic/public')) clientWs.send(publicMsgStomp);
        });
      }
    }
  });

  ws.on('close', () => {
    console.log(`Клиент ${clientId} отключен.`);
    clients.delete(ws);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Финальная версия мок-сервера запущен на порту ${PORT}`);
});
