import React, { useState } from 'react';
import { Container } from './style';
import useLeague from '../../../controller/league/use-league';
import Header from './header';
import SummonerProfile from './summoner-profile';
import SummonerHistory from './summoner-history';

function LNB() {
  const [isOpenHistory, setIsOpenHistory] = useState(false);

  useLeague();

  return (
    <Container>
      <Header />
      <SummonerProfile
        isOpenHistory={isOpenHistory}
        handleOpenHistory={() => setIsOpenHistory((prev) => !prev)}
      />
      {isOpenHistory && <SummonerHistory />}
    </Container>
  );
}

export default LNB;
