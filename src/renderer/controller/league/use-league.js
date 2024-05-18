import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { leagueStatusState, myTeamSummonersState, normalGameRoomIdState, summonerState } from '../../@store/league';

function useLeague() {
  const [leagueStatus, setLeagueStatus] = useRecoilState(leagueStatusState);
  const [summoner, setSummoner] = useRecoilState(summonerState);
  const [myTeamSummoners, setMyTeamSummoners] = useRecoilState(myTeamSummonersState);

  const [noramlGameRoomId, setNormalGameRoomId] = useRecoilState(normalGameRoomIdState);

  useEffect(() => {
    function onClient(_, summoner) {
      setSummoner(summoner);
    };
    function offClient() {
      setLeagueStatus('none');
      setSummoner(null);
    };
    function matchedNormalGame(_, { roomId, summoners }) {
      setLeagueStatus('loading');
      setNormalGameRoomId(roomId);
      setMyTeamSummoners([...summoners.map((teamSummoner) => {
        teamSummoner.isShow = teamSummoner.puuid === summoner.puuid;
        return teamSummoner;
      })]);
    }

    /* 롤 클라이언트 켜짐 */
    window.ipcRenderer.on('on-league-client', onClient);
    /* 롤 클라이언트 꺼짐 */
    window.ipcRenderer.on('off-league-client', offClient);
    /* 일반게임 매칭됨 */
    window.ipcRenderer.on('matched-normal-game', matchedNormalGame);

    return () => {
      window.ipcRenderer.removeListener('on-league-client', onClient);
      window.ipcRenderer.removeListener('off-league-client', offClient);
      window.ipcRenderer.removeListener('team-join-room', offClient);
    };
  }, []);
}

export default useLeague;
