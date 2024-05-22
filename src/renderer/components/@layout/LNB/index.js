import React, { useEffect, useState } from 'react';
import { Container } from './style';
import Header from './header';
import SummonerProfile from './summoner-profile';
import SummonerHistory from './summoner-history';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LNBState } from '../../../@store/ui';
import { summonerState } from '../../../@store/league';

function LNB() {
  const [LNBStore, setLNBStore] = useRecoilState(LNBState);
  const summoner = useRecoilValue(summonerState);

  const [isOpenHistory, setIsOpenHistory] = useState(false);

  useEffect(() => {
    setLNBStore((prev) => ({ ...prev, summoner }));
  }, [summoner]);

  useEffect(() => {
    if (summoner && !LNBStore.summoner) {
      setLNBStore((prev) => ({ ...prev, summoner }));
    }
    setIsOpenHistory(true);
  }, [LNBStore.summoner]);

  const handleOpenHistory = () => {
    if (LNBStore.summoner?.puuid !== summoner.puuid) {
      setLNBStore((prev) => ({ ...prev, summoner }));
    };
    setIsOpenHistory((prev) => !prev);
  }

  if (!LNBStore.isShow) return;

  return (
    <Container>
      <Header />
      <SummonerProfile
        summoner={LNBStore.summoner}
        isOpenHistory={isOpenHistory}
        handleOpenHistory={handleOpenHistory}
      />
      {isOpenHistory && <SummonerHistory summoner={LNBStore.summoner} />}
    </Container>
  );
}

export default LNB;
