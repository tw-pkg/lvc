import { Flex } from 'antd';
import RankBadge from '../../../@common/rank-badge';
import { Container, Img, Wrapper, Nickname, Text, Time } from './style';

function Message({ summoner, text, time }) {
  return (
    <Container>
      <Img src={summoner.profileImage} />
      <Flex vertical flex={1} gap={12}>
        <Wrapper>
          <Nickname>{summoner.name}</Nickname>
          <RankBadge tier={summoner.tier} />
          <Time>{time}</Time>
        </Wrapper>
        <Text disabled autoSize value={text} />
      </Flex>
    </Container>
  );
}

export default Message;
