import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDeviceIdState, userStreamState } from '../../../@store/voice';
import { leagueStatusState, myTeamSummonersState, normalGameRoomIdState, summonerState } from '../../../@store/league';
import { getUserStream } from '../../../utils/voice';
import useTeamVoice from '../../../controller/league/use-team-voice';

function TeamVoiceRoom() {
  const userDeviceId = useRecoilValue(userDeviceIdState);
  const [userStream, setUserStream] = useRecoilState(userStreamState);

  const roomId = useRecoilValue(normalGameRoomIdState);
  const leagueStatus = useRecoilValue(leagueStatusState);
  const summoner = useRecoilValue(summonerState);
  const [myTeamSummoners, setMyTeamSummoners] = useRecoilState(myTeamSummonersState);

  const [isJoined, setIsJoined] = useState(false);
  const [voiceOptions, setVoiceOptions] = useState(new Map());

  const { joinRoom } = useTeamVoice();

  useEffect(() => {
    getUserStream(userDeviceId).then((stream) => {
      setUserStream(stream);
    });
  }, [userDeviceId]);

  useEffect(() => {
    if (roomId && userStream && summoner && !isJoined) {
      joinRoom(userStream);
      setIsJoined(true);
    }
  }, [userStream, isJoined, roomId, summoner]);

  return <Fragment>
    {myTeamSummoners?.map((summoner) => (
      summoner.isShow && <Fragment key={summoner.puuid}>
        <audio id={summoner.puuid + 'audio'} autoPlay />
      </Fragment>
    ))}
  </Fragment>;
}

export default TeamVoiceRoom;