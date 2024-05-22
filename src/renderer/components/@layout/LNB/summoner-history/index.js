import { Fragment, useEffect, useState } from 'react';
import {
  Container,
  AverageInfo,
  WinningPercentage,
  ProgressBar,
  RecentlyPlayList,
  Empty,
} from './style';

function SummonerHistory({ summoner }) {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (!summoner) return;

    window.ipcRenderer
      .invoke('summoner-history', summoner.puuid)
      .then((history) => setHistory(history));
  }, [summoner]);

  if (!history) return <Fragment></Fragment>;

  return (
    <Container>
      <AverageInfo>
        <div id="info-category">
          <p id="name">KDA</p>
          <p id="value">{`${history.kill}/${history.death}/${history.assist}`}</p>
        </div>
        <div id="info-category">
          <p id="name">평균 피해량</p>
          <p id="value">{history.damage}</p>
        </div>
        <div id="info-category">
          <p id="name">평균 CS</p>
          <p id="value">{history.cs}</p>
        </div>
        <div id="info-category">
          <p id="name">모스트 챔피언</p>
          <div id="most-champ-list">
            {history.mostChamps?.map((champ, i) => (
              <img src={champ.icon} key={i} />
            ))}
          </div>
        </div>
      </AverageInfo>
      <WinningPercentage>
        <div id="winning-percentage-text">
          <p>승률</p>
          <p id="value" style={{ color: history.winningRate >= 60 && '#698DE7' }}>
            {history.winningRate}%
          </p>
        </div>
        <ProgressBar>
          <progress value={history.totalWin} max={history.totalWin + history.totalFail} />
          <p id="win">{history.totalWin}W</p>
          <p id="fail">{history.totalFail}L</p>
        </ProgressBar>
      </WinningPercentage>
      <RecentlyPlayList>
        <div id="category-tag">
          <p>최근 플레이</p>
        </div>
        <div id="game-info">
          {history.stats?.map((stat, idx) => (
            <div id="play" key={idx}>
              <div id="kda">
                <img src={stat.icon} />
                <div
                  style={{ backgroundColor: stat.isWin ? '#0F3054' : '#50383b' }}
                >{`${stat.kill}/${stat.death}/${stat.assist}`}</div>
              </div>
              <p id="time">{stat.time}</p>
            </div>
          ))}
        </div>
        {!history.stats && (
          <Empty>
            {/* <PiWarningCircle /> */}
            <p>전적이 없습니다.</p>
          </Empty>
        )}
      </RecentlyPlayList>
    </Container>
  );
}

export default SummonerHistory;
