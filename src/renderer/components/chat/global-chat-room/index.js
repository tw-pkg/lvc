import { useEffect, useRef, useState } from 'react';
import MessageInput from '../message-input';
import Message from './message';
import { Container, Messages } from './style';
import { useRecoilValue } from 'recoil';
import { createSocket } from '../../../utils/socket';
import { summonerState } from '../../../@store/league';

function GlobalChatRoom() {
  const summoner = useRecoilValue(summonerState);

  const [messages, setMessages] = useState([]);

  const chatRef = useRef();
  const chatSocket = useRef();

  useEffect(() => {
    const socket = createSocket('/global-chat');

    socket.on('connect', () => {
      chatSocket.current = socket;
    });
    socket.on('disconnect', () => {
      chatSocket.current = null;
    });

    socket.once('init', (messages) => {
      setMessages(messages);
    });

    socket.on('new-message', handleReceiveMessage);

    socket.on('before-messages', handleReceiveBeforeMessages);

    return () => {
      socket.disconnect();
      socket.off('new-message', handleReceiveMessage);
      socket.on('before-messages', handleReceiveBeforeMessages);

      chatSocket.current = null;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: chatRef.current.scrollHeight });
  }, [messages]);

  const handleReceiveBeforeMessages = (messages) => {
    setMessages((prev) => [messages, ...prev]);
  }

  const handleReceiveMessage = (message) => {
    const { summoner, text, time } = message;
    setMessages((prev) => [...prev, message]);
  }

  const handleSendMessage = (text) => {
    if (!chatSocket.current || !summoner) return;

    chatSocket.current.emit('new-message', { summoner, text });
  };

  return (
    <Container>
      <Messages ref={chatRef}>
        {messages.map((message, i) => (
          <Message
            key={i}
            summoner={message.summoner}
            text={message.text}
            time={message.time}
          />))}
      </Messages>

      <MessageInput handleSubmit={handleSendMessage} />
    </Container>
  );
}

export default GlobalChatRoom;
