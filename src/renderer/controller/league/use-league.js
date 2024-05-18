import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { leagueStatusState, myTeamSummonersState, normalGameRoomIdState, summonerState } from '../../@store/league';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/path';

function useLeague() {
  const [leagueStatus, setLeagueStatus] = useRecoilState(leagueStatusState);
  const [summoner, setSummoner] = useRecoilState(summonerState);
  const [myTeamSummoners, setMyTeamSummoners] = useRecoilState(myTeamSummonersState);

  const [noramlGameRoomId, setNormalGameRoomId] = useRecoilState(normalGameRoomIdState);

  const navigate = useNavigate();

  useEffect(() => {
    function onClient(_, summoner) {
      setSummoner(summoner);
    };
    function offClient() {
      setLeagueStatus('none');
      setSummoner(null);
    };
    function matchedNormalGame(_, { roomId, puuid, summoners }) {
      setLeagueStatus('loading');
      setNormalGameRoomId(roomId);
      setMyTeamSummoners(summoners.map((summoner) => {
        const isShow = summoner.puuid === puuid;
        return { ...summoner, isShow };
      }));
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
      window.ipcRenderer.removeListener('matched-normal-game', matchedNormalGame);
    };
  }, []);

  useEffect(() => {
    if (leagueStatus === 'loading') {
      navigate(PATH.TEAM_VOICE_ROOM);
    }
  }, [leagueStatus]);

  console.log(leagueStatus, myTeamSummoners);
}

export default useLeague;
