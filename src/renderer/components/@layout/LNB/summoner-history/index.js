import { Fragment, useEffect, useState } from 'react';
import { Container, AverageInfo, WinningPercentage, ProgressBar, RecentlyPlayList } from './style';

function SummonerHistory() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    window.ipcRenderer.invoke('summoner-history').then((history) => {
      setHistory(history);
    });
  }, []);

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
            {history.mostChamps.map((champ) => (
              <img src={champ.icon} />
            ))}
          </div>
        </div>
      </AverageInfo>
      <WinningPercentage>
        <div id="winning-percentage-text">
          <p>승률</p>
          <p id="value" style={{ color: history.winningRate >= 60 && '#698DE7' }}>
            {50}%
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
          <p>킬관여</p>
        </div>
        <div id="game-info">
          {history.stats.map((stat, idx) => (
            <div id="kda-info" key={idx}>
              <img src={stat.icon} />
              <div
                style={{ backgroundColor: stat.isWin ? '#0F3054' : '#50383b' }}
              >{`${stat.kill}/${stat.death}/${stat.assist}`}</div>
            </div>
          ))}
        </div>
        {/* {record.statsList.length === 0 && (
          <div id="none-game-info">
            <img src={warning_icon} />
            <p>전적이 없습니다.</p>
          </div>
        )} */}
      </RecentlyPlayList>
    </Container>
  );
}

export default SummonerHistory;
