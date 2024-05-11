import { useRef } from 'react';
import { CustomTextArea } from './style';

function MessageInput({ handleSubmit }) {
  const ref = useRef();

  const handlePressEnter = (e) => {
    if (!ref.current || e.shiftKey) return;

    handleSubmit(e.target.value);
    ref.current.resizableTextArea.textArea.value = '';
  };

  return (
    <CustomTextArea
      ref={ref}
      className="message-input"
      onPressEnter={handlePressEnter}
      autoSize={{ minRows: 1, maxRows: 4 }}
      placeholder="메세지를 입력해주세요..."
    />
  );
}

export default MessageInput;
