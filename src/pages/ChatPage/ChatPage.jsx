import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatPage.module.scss';
import { Client } from '@stomp/stompjs';
import { useAuth } from '../../context/AuthContext';

const MOCK_USERS = [
  { id: null, name: 'Групповой чат', email: null },
  { id: 1, name: 'user1', email: 'user1@example.com' },
  { id: 2, name: 'user2', email: 'user2@example.com' },
  { id: 3, name: 'admin', email: 'admin@example.com' },
];

const ChatPage = ({ isAdmin }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState(isAdmin ? MOCK_USERS[0] : MOCK_USERS.find(u => u.id === 3));
  const stompClientRef = useRef(null);

  // --- Функция для загрузки истории (ИСПРАВЛЕНО) ---
  const fetchHistory = async (chat) => {
    if (!chat || !currentUser) return;
    
    let endpoint;
    if (chat.id === null) {
      endpoint = '/api/chat/public';
    } else {
      // Теперь мы передаем ID обоих участников для корректного запроса
      const otherUserId = chat.id;
      endpoint = `/api/chat/private/${currentUser.id}/${otherUserId}`;
    }

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Network response was not ok');
      const history = await response.json();
      
      const formattedHistory = history.map(msg => ({
        id: msg.id,
        text: msg.content,
        sender: msg.senderUsername,
        isOutgoing: msg.senderEmail === currentUser.email,
        timestamp: new Date(msg.sentAt).toLocaleTimeString().slice(0, 5),
      }));
      setMessages(formattedHistory);
    } catch (error) {
      console.error("Не удалось загрузить историю чата:", error);
      setMessages([]);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const client = new Client({
      brokerURL: `ws://${window.location.hostname}:3001/api`,
      debug: (str) => console.log(new Date(), str),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe('/topic/public', (message) => handleReceivedMessage(JSON.parse(message.body), true));
      client.subscribe(`/user/${currentUser.email}/queue/messages`, (message) => handleReceivedMessage(JSON.parse(message.body), false));
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) stompClientRef.current.deactivate();
    };
  }, [currentUser]);

  useEffect(() => {
    fetchHistory(activeChat);
  }, [activeChat]);

  // --- Обработчик входящих сообщений (ИСПРАВЛЕНО) ---
  const handleReceivedMessage = (received, isPublic) => {
    // Игнорируем эхо своих же сообщений
    if (received.senderInfo.id === currentUser.id) return;

    const isForCurrentPublicChat = isPublic && activeChat.id === null;
    // Сообщение для меня, если его отправитель - тот, с кем у меня открыт чат
    const isForCurrentPrivateChat = !isPublic && received.senderInfo.id === activeChat.id;

    if (isForCurrentPublicChat || isForCurrentPrivateChat) {
      const formatted = {
        id: received.id,
        text: received.content,
        sender: received.senderInfo.username,
        isOutgoing: false,
        timestamp: new Date(received.sentAt).toLocaleTimeString().slice(0, 5),
      };
      setMessages(prev => [...prev, formatted]);
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!newMessage.trim() || !stompClientRef.current?.active) return;

    const messageToSend = {
      content: newMessage,
      recipientId: activeChat.id,
      senderInfo: {
        id: currentUser.id,
        email: currentUser.email,
        username: currentUser.username,
      }
    };

    stompClientRef.current.publish({
      destination: '/app/send',
      body: JSON.stringify(messageToSend),
    });

    const outgoingMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'Me',
      isOutgoing: true,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
    };
    setMessages(prev => [...prev, outgoingMessage]);
    setNewMessage('');
  };

  // ... остальной код рендеринга ...
  const chatAreaContent = (
    <main className={styles.chatArea}>
      <div className={styles.chatArea__messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={`${styles.message} ${msg.isOutgoing ? styles.message_outgoing : styles.message_incoming}`}>
            <div className={styles.message__bubble}>
              {!msg.isOutgoing && <span className={styles.message__sender}>{msg.sender}</span>}
              <p className={styles.message__text}>{msg.text}</p>
              <span className={styles.message__timestamp}>{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <form className={styles.chatArea__form} onSubmit={handleSendMessage}>
        <input type="text" className={styles.chatArea__input} placeholder="Написать сообщение..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit" className={styles.chatArea__sendBtn} aria-label="Отправить сообщение"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" /></svg></button>
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
            {MOCK_USERS.filter(u => u.id !== currentUser.id).map(user => (
              <li key={user.id || 'public'} 
                  className={`${styles.chatSidebar__item} ${activeChat.id === user.id ? styles.chatSidebar__item_active : ''}`}
                  onClick={() => setActiveChat(user)}>
                <img src={`https://via.placeholder.com/40?text=${user.name.charAt(0)}`} alt="Аватар" className={styles.chatSidebar__avatar} />
                <span className={styles.chatSidebar__name}>{user.name}</span>
              </li>
            ))}
          </ul>
        </aside>
        {chatAreaContent}
      </div>
    </div>
  );

  const userView = (
    <div className={`${styles.chatContainer} ${styles.userView}`}>
      <h2 className={styles.chatPage__title}>Чат с поддержкой</h2>
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
