import { useEffect, useState } from 'react';
import { CustomTextArea } from './style';

function MessageInput({ handleSubmit, maxLength }) {
  const [text, setText] = useState('');
  const [isPressEnter, setIsPressEnter] = useState(false);

  useEffect(() => {
    if (text === '') setIsPressEnter(false);
  }, [text]);

  function handleKeyDown(e) {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isPressEnter) return setText('');
      handlePressEnter(e);
    }
  }

  function handlePressEnter() {
    setText('');
    setIsPressEnter(true);
    handleSubmit(text.trim());
  };

  return (
    <CustomTextArea
      className="message-input"
      placeholder="메세지를 입력해주세요..."
      maxLength={maxLength}
      autoSize={{ minRows: 1, maxRows: 4 }}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

export default MessageInput;
