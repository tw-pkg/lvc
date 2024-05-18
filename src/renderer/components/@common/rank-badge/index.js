import { Container, Tier } from './style';

function RankBadge({ tier, onClick = () => { } }) {
  return (
    <Container className='rank-badge' onClick={onClick}>
      {/* <img src="" /> */}
      <Tier>{tier}</Tier>
    </Container>
  );
}

export default RankBadge;
