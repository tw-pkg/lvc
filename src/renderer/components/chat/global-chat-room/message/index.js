import { Flex } from 'antd';
import { Container, Img, Wrapper, Nickname, Text, Time } from './style';
import RankBadge from '../../../@common/rank-badge';
import { useRecoilState } from 'recoil';
import { LNBState } from '../../../../@store/ui';

function Message({ summoner, text, time }) {
  const [LNBStore, setLNBStore] = useRecoilState(LNBState);

  const handleClick = () => {
    setLNBStore((prev) => ({ ...prev, summoner }));
  }

  return (
    <Container>
      <Img src={summoner.profileImage} onClick={handleClick} />
      <Flex vertical flex={1} gap={12}>
        <Wrapper>
          <Nickname onClick={handleClick}>{summoner.name}</Nickname>
          <RankBadge tier={summoner.tier} onClick={handleClick} />
          <Time>{time}</Time>
        </Wrapper>
        <Text autoSize disabled value={text} />
      </Flex>
    </Container>
  );
}

export default Message;
