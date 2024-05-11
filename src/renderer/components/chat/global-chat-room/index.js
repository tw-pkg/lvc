import { useEffect, useRef, useState } from 'react';
import MessageInput from '../message-input';
import Message from './message';
import { Container, Messages } from './style';
import { useRecoilValue } from 'recoil';
import { createSocket } from '../../../utils/socket';
import { summonerState } from '../../../@store/league';
import useScrollTopHandler from '../../../controller/@common/useScrollTopEventHandler';

function GlobalChatRoom() {
  const summoner = useRecoilValue(summonerState);

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const [chatEvent, setChatEvent] = useState('init');
  const chatSocket = useRef();

  const { scrollRef, onWheel } =
    useScrollTopHandler({
      isCallable: !isLastPage,
      callback: handleRequestBeforeMessages,
      dependencyData: messages,
      scrollOffset: 20,
      touchDistanceCriterion: -50,
      wheelDistanceCriterion: -20,
    });

  useEffect(() => {
    const socket = createSocket('/global-chat');

    socket.on('connect', () => {
      chatSocket.current = socket;
    });
    socket.on('disconnect', () => {
      chatSocket.current = null;
    });
    socket.once('init', (messages) => setMessages(messages));
    socket.on('new-message', handleReceiveMessage);
    socket.on('before-messages', handleReceiveBeforeMessages);

    return () => {
      socket.disconnect();
      socket.off('new-message', handleReceiveMessage);
      socket.off('before-messages', handleReceiveBeforeMessages);
      chatSocket.current = null;
    };
  }, []);

  useEffect(() => {
    if (chatEvent === 'init') {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight });
      return;
    }
    if (chatEvent === 'new-message') {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight });
      return;
    }
  }, [messages]);

  function handleRequestBeforeMessages() {
    if (!chatSocket.current) return;
    setPage((prev) => prev + 1);
    chatSocket.current.emit('before-messages', { page: page + 1 });
  }
  function handleReceiveBeforeMessages({ isLast, messages }) {
    setChatEvent('before-messages');
    setIsLastPage(isLast);
    setMessages((prev) => [...messages, ...prev]);
  }

  function handleReceiveMessage(message) {
    setChatEvent('new-message');
    setMessages((prev) => [...prev, message]);
  }
  function handleSendMessage(text) {
    if (!chatSocket.current || !summoner) return;
    chatSocket.current.emit('new-message', { summoner, text });
  };

  return (
    <Container onWheel={onWheel} ref={scrollRef}>
      <Messages>
        {messages.map((message, i) => (
          <Message
            key={i}
            summoner={message.summoner}
            text={message.text}
            time={message.time}
          />))}
      </Messages>

      <MessageInput maxLength={2000} handleSubmit={handleSendMessage} />
    </Container>
  );
}

export default GlobalChatRoom;
