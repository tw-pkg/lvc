import { useEffect } from 'react';
import { Container, AverageInfo, WinningPercentage, ProgressBar, RecentlyPlayList } from './style';

function SummonerHistory() {
  useEffect(() => {
    window.ipcRenderer.invoke('summoner-history').then((history) => {
      console.log(history);
    });
  }, []);

  return (
    <Container>
      <AverageInfo>
        <div id="info-category">
          <p id="name">KDA</p>
          <p id="value">2/2/2</p>
        </div>
        <div id="info-category">
          <p id="name">평균 피해량</p>
          <p id="value">{23423}</p>
        </div>
        <div id="info-category">
          <p id="name">평균 CS</p>
          <p id="value">{21937}</p>
        </div>
        <div id="info-category">
          <p id="name">모스트 챔피언</p>
          <div id="most-champ-list">
            <img src={''} />
            <img src={''} />
            <img src={''} />
          </div>
        </div>
      </AverageInfo>

      <WinningPercentage>
        <div id="winning-percentage-text">
          <p>승률</p>
          <p id="value" style={{ color: 50 >= 60 && '#698DE7' }}>
            {50}%
          </p>
        </div>
        <ProgressBar>
          <progress value={5} max={10} />
          <p id="win">{5}W</p>
          <p id="fail">{5}L</p>
        </ProgressBar>
      </WinningPercentage>

      <RecentlyPlayList>
        <div id="category-tag">
          <p>최근 플레이</p>
          <p>킬관여</p>
        </div>
        <div id="game-info">
          <div id="kda-info">
            <img src={''} />
            <div style={{ backgroundColor: true ? '#0F3054' : '#50383b' }}>2/2/2</div>
          </div>
          <p id="kill-involvement">30%</p>
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
