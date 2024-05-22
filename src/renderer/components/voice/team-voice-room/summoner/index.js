import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userStreamState } from '../../../../@store/voice';
import { getSummonerAudio, handleMicVisualizer } from '../../../../utils/voice';
import { Container, CustomSlider, History, Icon, Name, Profile, SpeakerWrapper, AverageInfo, WinningPercentage, ProgressBar, RecentlyPlayList } from './style';
import RankBadge from '../../../@common/rank-badge';
import { Flex } from 'antd';
import HEADSET_ICON from '../../../../assets/icon/headset_icon.svg';
import HEADSET_MUTE_ICON from '../../../../assets/icon/headset_mute_icon.svg';
import MIC_ICON from '../../../../assets/icon/mic_icon.svg';
import MIC_MUTE_ICON from '../../../../assets/icon/mic_mute_icon.svg';

function Summoner({ voiceSocket, summoner, isMine }) {
  const userStream = useRecoilValue(userStreamState);

  const [isMuteMic, setIsMuteMic] = useState(false);
  const [micVisualizer, setMicVisualizer] = useState(1);
  const [isMuteSpeaker, setIsMuteSpeaker] = useState(false);
  const [speakerVolume, setSpeakerVolume] = useState(1);

  useEffect(() => {
    if (isMine && userStream) {
      handleMicVisualizer(userStream, isMuteMic, setMicVisualizer);
    }
  }, [userStream, isMuteMic]);

  useEffect(() => {
    if (!isMine) return;

    voiceSocket?.emit('mic-visualizer', {
      puuid: summoner.puuid,
      volume: micVisualizer,
    });
  }, [micVisualizer]);

  useEffect(() => {
    if (isMine) return;

    /* 팀원의 마이크 비주얼라이저 받기 */
    const onMicVisualizer = ({ puuid, volume }) => {
      if (!isMuteSpeaker && summoner.puuid === puuid) {
        setMicVisualizer(volume);
      }
    };

    voiceSocket?.on('mic-visualizer', onMicVisualizer);

    return () => {
      voiceSocket?.off('mic-visualizer', onMicVisualizer);
    };
  }, [isMine, isMuteSpeaker]);

  const handleChangeSpeakerVolume = (volume) => {
    const speaker = getSummonerAudio(summoner.puuid);
    speaker.volume = volume;
    setSpeakerVolume(volume);
    setIsMuteSpeaker(volume === 0);
    setIsMuteMic(volume === 0);
  };

  const handleMuteSpeaker = () => {
    if (isMuteSpeaker) {
      handleChangeSpeakerVolume(1);
    } else {
      handleChangeSpeakerVolume(0);
    }
  };

  const handleMuteMic = () => {
    userStream?.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    setIsMuteMic((prev) => !prev);
  };

  return (
    <Container>
      <Profile
        $isMute={isMuteMic || isMuteSpeaker}
        $visualize={!isMuteMic && !isMuteSpeaker && micVisualizer > 20}
        src={summoner.profileImage}
      />
      <Flex vertical gap={10} style={{ width: '100%' }}>
        <Flex style={{ marginTop: 50 }} justify='center' gap={20}>
          <Name $length={summoner.name.length}>{summoner.name}</Name>
          <RankBadge tier={summoner.tier} />
        </Flex>

        {isMine &&
          <Flex justify='center'>
            <Icon
              src={isMuteMic ? MIC_MUTE_ICON : MIC_ICON}
              onClick={handleMuteMic}
            />
          </Flex>
        }
        {!isMine &&
          <Fragment>
            <SpeakerWrapper>
              <Icon
                src={isMuteSpeaker ? HEADSET_MUTE_ICON : HEADSET_ICON}
                onClick={handleMuteSpeaker}
              />
              <CustomSlider
                min={0}
                max={100}
                value={speakerVolume * 100}
                onChange={(volume) => setSpeakerVolume(volume / 100)}
              />
            </SpeakerWrapper>
            <audio id={summoner.puuid + 'audio'} autoPlay />
          </Fragment>
        }

        <History>
          <AverageInfo>
            <div id="info-category">
              <p id="name">KDA</p>
              <p id="value">{`${summoner.stats.kill}/${summoner.stats.death}/${summoner.stats.assist}`}</p>
            </div>
            <div id="info-category">
              <p id="name">평균 피해량</p>
              <p id="value">{summoner.stats.damage}</p>
            </div>
            <div id="info-category">
              <p id="name">평균 CS</p>
              <p id="value">{summoner.stats.cs}</p>
            </div>
            <div id="info-category">
              <p id="name">모스트 챔피언</p>
              <div id="most-champ-list">
                {summoner.stats.mostChamps?.map((champ, i) => (
                  <img src={champ.icon} key={i} />
                ))}
              </div>
            </div>
          </AverageInfo>
          <WinningPercentage>
            <div id="winning-percentage-text">
              <p>승률</p>
              <p id="value" style={{ color: summoner.stats.winningRate >= 60 && '#698DE7' }}>
                {summoner.stats.winningRate}%
              </p>
            </div>
            <ProgressBar>
              <progress value={summoner.stats.totalWin} max={summoner.stats.totalWin + summoner.stats.totalFail} />
              <p id="win">{summoner.stats.totalWin}W</p>
              <p id="fail">{summoner.stats.totalFail}L</p>
            </ProgressBar>
          </WinningPercentage>
          <RecentlyPlayList>
            <div id="category-tag">
              <p>최근 플레이</p>
            </div>
            <div id="game-info">
              {summoner.stats.stats?.map((stat, i) => (
                <div id="play" key={i}>
                  <div id="kda">
                    <img src={stat.icon} />
                    <div style={{ backgroundColor: stat.isWin ? '#0F3054' : '#50383b' }}>
                      {`${stat.kill}/${stat.death}/${stat.assist}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* {!summoner.stats.stats && (
              <Empty>
                <PiWarningCircle />
                <p>전적이 없습니다.</p>
              </Empty>
            )} */}
          </RecentlyPlayList>
        </History>
      </Flex>
    </Container >
  );
}

export default Summoner;