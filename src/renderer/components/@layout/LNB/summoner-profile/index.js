import React from 'react';
import { Container, Img, Nickname, Wrapper } from './style';
import RankBadge from '../../../@common/rank-badge';
import { useRecoilValue } from 'recoil';
import { summonerState } from '../../../../@store/league';

function SummonerProfile({ isOpenHistory, handleOpenHistory }) {
  const summoner = useRecoilValue(summonerState);

  return (
    summoner && (
      <Container $clicked={isOpenHistory} onClick={handleOpenHistory}>
        <Img src={summoner.profileImage} />
        <Wrapper>
          <Nickname>{summoner.name}</Nickname>
          <RankBadge tier={summoner.tier} />
        </Wrapper>
      </Container>
    )
  );
}

export default SummonerProfile;
