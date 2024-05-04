import { Container, Tier } from './style';

function RankBadge({ tier }) {
  return (
    <Container>
      {/* <img src="" /> */}
      <Tier>{tier}</Tier>
    </Container>
  );
}

export default RankBadge;
