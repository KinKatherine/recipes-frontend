import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatPage.module.scss';

const ChatPage = ({ isAdmin }) => {
  const [messages, setMessages] = useState([
    { text: 'Подключение к вашему локальному серверу...', sender: 'System', isOutgoing: false, timestamp: '' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef(null);

  useEffect(() => {

    const wsUrl = `ws://${window.location.host}/ws`;
    
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket-соединение с локальным сервером установлено.');
      setMessages(prev => [...prev, { text: 'Соединение установлено!', sender: 'System', isOutgoing: false, timestamp: new Date().toLocaleTimeString().slice(0, 5) }]);
      

    };

    ws.current.onmessage = (event) => {

      try {
        const receivedData = JSON.parse(event.data);
        
        const incomingMessage = {
          text: receivedData.text || 'Получено пустое сообщение',
          sender: receivedData.sender?.name || 'Unknown',
          isOutgoing: false,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
        };
        setMessages(prevMessages => [...prevMessages, incomingMessage]);
      } catch (error) {
        console.error("Не удалось обработать сообщение от сервера:", event.data);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket-соединение с локальным сервером закрыто.');
      setMessages(prev => [...prev, { text: 'Соединение потеряно.', sender: 'System', isOutgoing: false, timestamp: new Date().toLocaleTimeString().slice(0, 5) }]);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket-ошибка:', error);
      setMessages(prev => [...prev, { text: 'Ошибка соединения.', sender: 'System', isOutgoing: false, timestamp: new Date().toLocaleTimeString().slice(0, 5) }]);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!newMessage.trim() || ws.current?.readyState !== WebSocket.OPEN) return;


    const messageToSend = {
      text: newMessage,

    };

    ws.current.send(JSON.stringify(messageToSend));


    const outgoingMessage = {
      text: newMessage,
      sender: 'Me',
      isOutgoing: true,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
    };
    setMessages(prevMessages => [...prevMessages, outgoingMessage]);
    setNewMessage('');
  };

  // ... остальной код рендеринга (adminView, userView) остается без изменений ...
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
