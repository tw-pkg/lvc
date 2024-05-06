import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { leagueStatusState, summonerState } from '../../@store/league';

function useLeague() {
  const [leagueStatus, setLeagueStatus] = useRecoilState(leagueStatusState);
  const [summoner, setSummoner] = useRecoilState(summonerState);

  useEffect(() => {
    const onClient = (_, summoner) => {
      console.log('롤 켜짐');
      setSummoner(summoner);
    };
    const offClient = () => {
      console.log('롤 꺼짐');
      setLeagueStatus('none');
      setSummoner(null);
    };

    window.ipcRenderer.on('on-league-client', onClient);
    window.ipcRenderer.on('off-league-client', offClient);

    return () => {
      window.ipcRenderer.removeListener('on-league-client', onClient);
      window.ipcRenderer.removeListener('off-league-client', offClient);
    };
  }, []);
}

export default useLeague;
