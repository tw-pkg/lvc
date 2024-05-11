import { useState } from 'react';
import { CustomTextArea } from './style';

function MessageInput({ handleSubmit, maxLength }) {
  const [text, setText] = useState('');

  function handlePressEnter(e) {
    if (e.shiftKey) return;
    e.preventDefault();

    setText('');
    handleSubmit(text.trim());
  };

  return (
    <CustomTextArea
      className="message-input"
      placeholder="메세지를 입력해주세요..."
      autoSize={{ minRows: 1, maxRows: 4 }}
      maxLength={maxLength}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onPressEnter={handlePressEnter}
    />
  );
}

export default MessageInput;
