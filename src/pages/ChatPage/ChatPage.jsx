import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatPage.module.scss';
import { Client } from '@stomp/stompjs';
// Изменяем способ импорта SockJS, чтобы он был совместим с Vite
import SockJS from 'sockjs-client/dist/sockjs.min.js';

const ChatPage = ({ isAdmin }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const stompClientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      // URL для подключения выносим в отдельную переменную для читаемости
      brokerURL: `ws://${window.location.hostname}:3001/ws`,

      // Используем SockJS как запасной вариант, если нативные WebSockets не работают
      // Это более надежный способ
      webSocketFactory: () => new SockJS('http://localhost:3001/ws'),

      debug: (str) => {
        console.log(new Date(), str);
      },
      reconnectDelay: 5000,
    });

    client.onConnect = (frame) => {
      console.log('STOMP-соединение установлено:', frame);
      client.subscribe('/topic/public', (message) => {
        const receivedMessage = JSON.parse(message.body);
        const formattedMessage = {
          id: receivedMessage.id,
          text: receivedMessage.content,
          sender: receivedMessage.senderUsername,
          isOutgoing: false,
          timestamp: new Date(receivedMessage.sentAt).toLocaleTimeString().slice(0, 5),
        };
        setMessages(prevMessages => [...prevMessages, formattedMessage]);
      });
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!newMessage.trim() || !stompClientRef.current?.active) return;

    const messageToSend = {
      content: newMessage,
      recipientId: null,
      attachmentUrl: null,
    };

    stompClientRef.current.publish({
      destination: '/app/chat',
      body: JSON.stringify(messageToSend),
    });

    setNewMessage('');
  };

  // ... остальной код рендеринга без изменений ...
  const chatAreaContent = (
    <main className={styles.chatArea}>
      <div className={styles.chatArea__messages}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${msg.isOutgoing ? styles.message_outgoing : styles.message_incoming}`}>
            <div className={styles.message__bubble}>
              {!msg.isOutgoing && <span className={styles.message__sender}>{msg.sender}</span>}
              <p className={styles.message__text}>{msg.text}</p>
              <span className={styles.message__timestamp}>{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <form className={styles.chatArea__form} onSubmit={handleSendMessage}>
        <input
          type="text"
          className={styles.chatArea__input}
          placeholder="Написать сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className={styles.chatArea__sendBtn} aria-label="Отправить сообщение">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" /></svg>
        </button>
      </form>
    </main>
  );

  const adminView = (
    <div className={`${styles.chatContainer} ${styles.adminView}`}>
      <h2 className={styles.chatPage__title}>Чат с клиентами</h2>
      <div className={styles.chatWindow}>
        <aside className={styles.chatSidebar}>
          <h3 className={styles.chatSidebar__title}>Все чаты</h3>
          <ul className={styles.chatSidebar__list}>
            <li className={`${styles.chatSidebar__item} ${styles.chatSidebar__item_active}`}>
              <img src="https://via.placeholder.com/40" alt="Аватар" className={styles.chatSidebar__avatar} />
              <span className={styles.chatSidebar__name}>Групповой чат</span>
            </li>
          </ul>
        </aside>
        {chatAreaContent}
      </div>
    </div>
  );

  const userView = (
    <div className={`${styles.chatContainer} ${styles.userView}`}>
      <h2 className={styles.chatPage__title}>Чат с админом</h2>
      <div className={styles.chatWindow}>
        {chatAreaContent}
      </div>
    </div>
  );

  return (
    <section className={styles.chatPage}>
      {isAdmin ? adminView : userView}
    </section>
  );
};

export default ChatPage;
