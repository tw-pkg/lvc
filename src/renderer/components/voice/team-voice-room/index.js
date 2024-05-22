import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userDeviceIdState, userStreamState } from '../../../@store/voice';
import { leagueStatusState, myTeamSummonersState, normalGameRoomIdState, summonerState } from '../../../@store/league';
import { getUserStream } from '../../../utils/voice';
import useTeamVoice from '../../../controller/league/use-team-voice';
import Summoner from './summoner';
import { Container } from './style';
import { Flex } from 'antd';
import { LNBState } from '../../../@store/ui';

function TeamVoiceRoom() {
  const userDeviceId = useRecoilValue(userDeviceIdState);
  const [userStream, setUserStream] = useRecoilState(userStreamState);

  const roomId = useRecoilValue(normalGameRoomIdState);

  const leagueStatus = useRecoilValue(leagueStatusState);
  const mySummoner = useRecoilValue(summonerState);
  const [myTeamSummoners, setMyTeamSummoners] = useRecoilState(myTeamSummonersState);

  const [isJoined, setIsJoined] = useState(false);
  const [voiceOptions, setVoiceOptions] = useState(new Map());

  const { joinRoom, voiceSocket } = useTeamVoice();

  const setLNBStore = useSetRecoilState(LNBState);

  useEffect(() => {
    setLNBStore((prev) => ({ ...prev, isShow: false }));

    return () => {
      setLNBStore((prev) => ({ ...prev, isShow: true }));
    }
  }, []);

  useEffect(() => {
    getUserStream(userDeviceId).then((stream) => {
      setUserStream(stream)
    });
  }, [userDeviceId]);

  useEffect(() => {
    if (!roomId && userStream) return;

    if (voiceSocket?.connected && !isJoined) {
      joinRoom(userStream);
      setIsJoined(true);
    }
  }, [userStream, isJoined]);

  return <Container>
    <Flex gap={5}>
      {myTeamSummoners?.map((summoner) => (
        summoner.isShow && (
          <Summoner
            key={summoner.puuid}
            voiceSocket={voiceSocket}
            summoner={summoner}
            isMine={summoner.puuid === mySummoner.puuid}
          />)
      ))}
    </Flex>
  </Container>
}

export default TeamVoiceRoom;