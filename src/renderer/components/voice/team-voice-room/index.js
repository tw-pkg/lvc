import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDeviceIdState, userStreamState } from '../../../@store/voice';
import { leagueStatusState, myTeamSummonersState } from '../../../@store/league';
import { getUserStream } from '../../../utils/voice';
import useTeamVoice from '../../../controller/league/use-team-voice';

function TeamVoiceRoom() {
  const userDeviceId = useRecoilValue(userDeviceIdState);
  const [userStream, setUserStream] = useRecoilState(userStreamState);

  const leagueStatus = useRecoilValue(leagueStatusState);
  const myTeamSummoners = useRecoilValue(myTeamSummonersState);

  const [isJoined, setIsJoined] = useState(false);
  const [voiceOptions, setVoiceOptions] = useState(new Map());

  const { joinRoom } = useTeamVoice();

  useEffect(() => {
    getUserStream(userDeviceId).then((stream) => {
      setUserStream(stream);
    });
  }, [userDeviceId]);

  useEffect(() => {
    if (userStream && !isJoined) {
      joinRoom(userStream);
      setIsJoined(true);
    }
  }, [userStream, isJoined]);

  console.log('게임 상태', leagueStatus);
  console.log('소환사 팀원', myTeamSummoners);

  return <Fragment>
    {myTeamSummoners?.map((summoner) => (
      <audio id={summoner.puuid.toString() + 'audio'} autoPlay />
    ))}
  </Fragment>;
}

export default TeamVoiceRoom;